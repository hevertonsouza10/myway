// Lista as tags, setores e usuários do Anexo Chat para você pegar os IDs.
// Roda só no seu computador (não existe rota pública para isso):
//   node --env-file=.env.local scripts/anexo-setup.mjs
const BASE = "https://api.anexochat.com.br/core/v2/api";
const token = process.env.ANEXO_TOKEN;

if (!token) {
  console.error("Defina ANEXO_TOKEN no arquivo .env.local antes de rodar.");
  process.exit(1);
}

async function get(path) {
  const res = await fetch(BASE + path, { headers: { "access-token": token } });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${path} -> ${res.status} ${data.errorCode ?? ""} ${data.msg ?? ""}`);
  return data;
}

const pick = (list, keys) =>
  Array.isArray(list) ? list.map((item) => Object.fromEntries(keys.map((key) => [key, item[key] ?? item[key[0].toUpperCase() + key.slice(1)]]))) : list;

const [tags, sectors, users, chatbots] = await Promise.all([
  get("/tags"),
  get("/sectors"),
  get("/users"),
  get("/chatbots"),
]);

console.log("\nTAGS (use o id em ANEXO_TAG_IDS)");
console.table(pick(tags, ["id", "description"]));
console.log("\nSETORES (use o id em ANEXO_SECTOR_ID)");
console.table(pick(sectors, ["id", "name"]));
console.log("\nUSUÁRIOS (use o id em ANEXO_USER_ID)");
console.table(pick(users, ["id", "name"]));

// Cada bloco do fluxo é um "menu". Procure "CRM · Localizar ou criar negócio".
for (const bot of Array.isArray(chatbots) ? chatbots : []) {
  const menus = await get(`/chatbots/${bot.id}/menus`).catch((error) => error.message);
  console.log(`\nMENUS DO CHATBOT "${bot.description}" (use o id em ANEXO_CRM_MENU_ID)`);
  console.table(pick(menus, ["id", "description"]));
}
