// Recebe o formulário de /candidatura e envia o lead para o CRM do Anexo Chat.
// O token do Anexo fica só aqui no servidor (variável ANEXO_TOKEN na Vercel).
import { NextResponse, type NextRequest } from "next/server";
import { candidaturaPrograms, candidaturaUnits } from "@/content/candidatura";
import { anexoConfigured, normalizePhone, sendLeadToAnexo } from "@/lib/anexo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 10_000;
const MIN_FILL_MS = 3_000;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60_000 };
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;

// Limite por IP em memória. Cada instância da Vercel tem o seu, então é uma
// barreira contra abuso simples; o anti-bot e a validação fazem o resto.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) hits.clear();
  return recent.length > RATE_LIMIT.max;
}

// Remove caracteres de controle e corta no tamanho máximo.
const clean = (value: unknown, max: number) =>
  String(value ?? "").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim().slice(0, max);

const fail = (status: number, erro: string) => NextResponse.json({ ok: false, erro }, { status });

// Aceita só envios feitos pelo próprio site (bloqueia formulários de outros domínios).
function sameOrigin(request: NextRequest) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return false;
  const origin = request.headers.get("origin");
  if (!origin) return Boolean(fetchSite);
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!sameOrigin(request)) return fail(403, "Origem não permitida.");
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return fail(415, "Formato inválido.");
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return fail(429, "Muitas tentativas. Aguarde alguns minutos e tente de novo.");
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return fail(413, "Dados grandes demais.");

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error();
  } catch {
    return fail(400, "Dados inválidos.");
  }

  // Anti-bot: campo invisível preenchido ou envio rápido demais. Responde "ok"
  // para o robô não perceber que foi barrado.
  const startedAt = Number(body.startedAt);
  if (body.website || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.nome, 120).replace(/\s+/g, " ");
  const phone = normalizePhone(clean(body.whatsapp, 30));
  const email = clean(body.email, 160).toLowerCase();
  const city = clean(body.cidade, 120);
  const unit = clean(body.unidade, 60);
  const program = clean(body.programa, 80);
  const company = clean(body.empresa, 120);
  const role = clean(body.cargo, 120);
  const motivation = clean(body.motivacao, 1500);
  const source = clean(body.origem, 200) || "Site MyWay - Candidatura";

  if (name.length < 3 || !/^55\d{10,11}$/.test(phone) || !EMAIL_RE.test(email) || !city) {
    return fail(400, "Confira nome, WhatsApp, e-mail e cidade.");
  }
  if (!candidaturaPrograms.includes(program) || !candidaturaUnits.includes(unit)) {
    return fail(400, "Escolha a turma e a unidade.");
  }
  if (body.consentimento !== true) {
    return fail(400, "É preciso autorizar o contato para enviar a candidatura.");
  }

  if (!anexoConfigured()) {
    console.error("Candidatura: ANEXO_TOKEN não configurado.");
    return fail(503, "Não conseguimos registrar agora. Fale com a gente pelo WhatsApp.");
  }

  const submittedAt = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const observation = [
    `CANDIDATURA: ${program}`,
    `Data: ${submittedAt}`,
    `Unidade: ${unit}`,
    `Cidade: ${city}`,
    `E-mail: ${email}`,
    company && `Empresa: ${company}`,
    role && `Cargo: ${role}`,
    motivation && `Por que quer participar: ${motivation}`,
    `Origem: ${source}`,
  ].filter(Boolean).join("\n");

  try {
    await sendLeadToAnexo({
      name,
      phone,
      email,
      observation,
      firstName: name.split(" ")[0],
      program,
      attributes: [
        ["programa", program, "Turma de interesse"],
        ["unidade", unit, "Unidade"],
        ["cidade", city, "Cidade"],
        ["email", email, "E-mail"],
        ["empresa", company, "Empresa"],
        ["cargo", role, "Cargo"],
        ["motivacao", motivation, "Por que quer participar"],
        ["origem", source, "Origem do lead"],
        ["data_candidatura", submittedAt, "Data da candidatura"],
      ],
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    // Registra só o erro técnico, sem dados pessoais do candidato.
    console.error("Candidatura: falha no Anexo:", (error as Error).message);
    return fail(502, "Não conseguimos registrar agora. Tente de novo em instantes ou fale pelo WhatsApp.");
  }
}
