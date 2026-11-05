// Cliente mínimo da API do Anexo Chat (https://api.anexochat.com.br/swagger).
// Só roda no servidor: o token vem de variável de ambiente e nunca vai para o navegador.
// O import abaixo faz o build falhar se alguém importar este arquivo num componente do navegador.
import "server-only";

const BASE = "https://api.anexochat.com.br/core/v2/api";

export class AnexoError extends Error {
  constructor(message: string, readonly status: number, readonly data: unknown) {
    super(message);
  }
}

export function anexoConfigured() {
  return Boolean(process.env.ANEXO_TOKEN);
}

export async function anexo<T = Record<string, unknown>>(
  path: string,
  { method = "GET", body }: { method?: string; body?: unknown } = {},
): Promise<T> {
  const res = await fetch(BASE + path, {
    method,
    headers: {
      "access-token": process.env.ANEXO_TOKEN ?? "",
      "Content-Type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  });
  const text = await res.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  if (!res.ok) {
    const info = data as { errorCode?: string; msg?: string };
    throw new AnexoError(
      `Anexo ${method} ${path} -> ${res.status} ${info.errorCode ?? ""} ${info.msg ?? ""}`.trim(),
      res.status,
      data,
    );
  }
  return data as T;
}

// "(51) 99999-1234" -> "5551999991234"
export function normalizePhone(value: unknown) {
  let digits = String(value ?? "").replace(/\D/g, "").replace(/^0+/, "");
  if (digits.length === 10 || digits.length === 11) digits = `55${digits}`;
  return digits;
}

const envList = (name: string) =>
  (process.env[name] ?? "").split(",").map((item) => item.trim()).filter(Boolean);

export type Lead = {
  name: string;
  phone: string;
  email: string;
  attributes: [key: string, value: string, description: string][];
  observation: string;
  firstName: string;
  program: string;
};

// Cria/atualiza o contato, aplica a tag de entrada do funil, salva os campos
// como atributos e, se ativado, abre um atendimento com mensagem de boas-vindas.
export async function sendLeadToAnexo(lead: Lead) {
  await anexo("/contacts", {
    method: "POST",
    body: {
      number: lead.phone,
      nickName: lead.name,
      email: lead.email || null,
      observation: lead.observation,
      updateIfExists: true,
    },
  });

  // A criação não devolve o ID, então buscamos pelo número.
  const contact = await anexo<{ id: string }>(`/contacts/number/${lead.phone}`);
  const contactId = contact.id;

  const tagIds = envList("ANEXO_TAG_IDS");
  if (tagIds.length) {
    await anexo(`/contacts/${contactId}/tags-add`, {
      method: "PUT",
      body: tagIds.map((id) => ({ id })),
    });
  }

  const attributes = lead.attributes
    .filter(([, value]) => value)
    .map(([key, value, description]) => ({ key, value, description }));
  if (attributes.length) {
    await anexo(`/contacts/${contactId}/set-attributes`, { method: "POST", body: attributes });
  }

  let chatId: string | null = null;
  if (process.env.ANEXO_OPEN_CHAT === "true") {
    const message = (
      process.env.ANEXO_MENSAGEM ||
      "Olá {nome}! Recebemos sua candidatura para o {programa} da MyWay Treinamentos. Em breve nossa equipe fala com você por aqui."
    )
      .replaceAll("{nome}", lead.firstName)
      .replaceAll("{programa}", lead.program);
    try {
      const chat = await anexo<{ chatId?: string }>("/chats/create-new", {
        method: "POST",
        body: {
          contactId,
          message,
          sectorId: process.env.ANEXO_SECTOR_ID || null,
          userId: process.env.ANEXO_USER_ID || null,
        },
      });
      chatId = chat.chatId ?? null;
    } catch (error) {
      // chat_11 = já existe atendimento aberto para o contato; o lead já foi salvo.
      console.warn("Anexo: atendimento não aberto:", (error as Error).message);
    }
  }

  // A conversa aberta pela API não passa pelo bloco "Início" do fluxo, então
  // mandamos o atendimento direto para o bloco "CRM · Localizar ou criar negócio".
  const crmMenuId = process.env.ANEXO_CRM_MENU_ID;
  if (chatId && crmMenuId) {
    try {
      await anexo(`/chats/${chatId}/send-menu?menuId=${encodeURIComponent(crmMenuId)}`, { method: "POST" });
    } catch (error) {
      console.warn("Anexo: bloco do CRM não acionado:", (error as Error).message);
    }
  }

  return { contactId, chatId };
}
