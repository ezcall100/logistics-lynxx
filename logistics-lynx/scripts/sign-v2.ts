// npx ts-node scripts/sign-v2.ts -m POST -u https://.../functions/v1/dlq-replay -k ops-n8n -s $TRANSBOT_HMAC_SECRET -d '{"company_id":"..."}'
import crypto from "node:crypto";
import { argv } from "node:process";

type Args = { m: string; u: string; k: string; s: string; d?: string; };
function getArg(flag: string, def = "") {
  const i = argv.indexOf(flag);
  return i > -1 ? argv[i+1] : def;
}

const args: Args = {
  m: getArg("-m","POST") || "POST",
  u: getArg("-u") || "",
  k: getArg("-k","ops-n8n") || "ops-n8n",
  s: getArg("-s", process.env['TRANSBOT_HMAC_SECRET'] || "") || "",
  d: getArg("-d")
};
if (!args.u || !args.s) {
  console.error("usage: -m POST -u <url> -k <keyId> -s <secret> -d '{json}'");
  process.exit(1);
}

const url = new URL(args.u);
const ts = Math.floor(Date.now()/1000);
const nonce = crypto.randomUUID();
const body = args.d || "";
const bodyHash = crypto.createHash("sha256").update(body).digest("hex");
const canon = `${ts}\n${nonce}\n${args.m.toUpperCase()}\n${url.pathname}\n${bodyHash}\n${args.k}`;
const sig = crypto.createHmac("sha256", args.s).update(canon).digest("hex");

const header = `v2 keyId=${args.k};ts=${ts};nonce=${nonce};sig=${sig}`;
console.log(`# X-Transbot-Signature: ${header}`);
