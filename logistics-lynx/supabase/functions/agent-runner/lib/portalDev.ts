import { upsertFile, ensureBranch, openPullRequest, getFile } from "./github.ts";

type Ctx = {
  gh: {
    token: string;
    owner: string;
    repo: string;
    defaultBranch: string;
  };
  dryRun?: boolean;
  allowPaths?: string[]; // safety allowlist (prefixes)
};

const ALLOW = [
  "src/pages/",
  "src/portals/registry.ts",
  "src/pages/_scaffold/PortalScaffold.tsx",
];

function assertAllowed(path: string, allow: string[]) {
  if (!allow.some(p => path.startsWith(p))) throw new Error(`Blocked path: ${path}`);
}

function niceTitle(key: string) {
  const map: Record<string,string> = {
    superAdmin:"Super Admin", admin:"Admin", tmsAdmin:"TMS Admin", onboarding:"Onboarding",
    broker:"Broker", shipper:"Shipper", carrier:"Carrier", driver:"Driver",
    ownerOperator:"Owner Operator", factoring:"Factoring", loadBoard:"Load Board",
    crm:"CRM", financials:"Financials", edi:"EDI", marketplace:"Marketplace",
    analytics:"Analytics", autonomous:"Autonomous AI", workers:"Workers",
    rates:"Rates", directory:"Directory",
  };
  return map[key] ?? key;
}

function scaffoldTSX(title: string) {
  return `import React from "react";

export default function ${title.replace(/\s+/g,"")}Portal() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">${title}</h1>
      <p className="text-muted-foreground">This portal is provisioned and protected. Build out features here.</p>
    </div>
  );
}
`;
}

async function ensureScaffold(ctx: Ctx, portalKey: string) {
  const title = niceTitle(portalKey);
  const pagePath = `src/pages/${portalKey}/index.tsx`;
  assertAllowed(pagePath, ctx.allowPaths ?? ALLOW);
  if (ctx.dryRun) return { pagePath, created: true, dryRun: true };

  await upsertFile(ctx.gh, pagePath, scaffoldTSX(title), `feat(portal): scaffold ${portalKey} portal`);
  return { pagePath, created: true };
}

function registryInsertSnippet(portalKey: string) {
  // Matches your registry interface & feature flags
  const title = niceTitle(portalKey);
  const featureFlag = `portal.${portalKey === "ownerOperator" ? "ownerOperator" : portalKey}.enabled`;
  // Reasonable default roles – adjust as needed
  const roles: Record<string,string[]> = {
    superAdmin:["super_admin"], admin:["owner","admin"], tmsAdmin:["owner","admin"], onboarding:["owner","admin","manager"],
    broker:["broker_admin","broker_user","owner","admin"], shipper:["shipper_admin","shipper_user","owner","admin"],
    carrier:["carrier_admin","carrier_user","owner","admin"], driver:["driver","carrier_admin","owner","admin"],
    ownerOperator:["owner_operator","owner","admin"], factoring:["finance_admin","owner","admin"],
    loadBoard:["broker_admin","carrier_user","owner","admin"], crm:["sales","manager","owner","admin"],
    financials:["finance_admin","owner","admin"], edi:["edi_admin","owner","admin"], marketplace:["owner","admin","manager"],
    analytics:["owner","admin","manager","analyst"], autonomous:["owner","admin","sre"], workers:["ops","owner","admin"],
    rates:["pricing","broker_admin","owner","admin"], directory:["owner","admin","manager","ops"],
  };
  const path = portalKey === "ownerOperator" ? "/owner-operator"
            : portalKey === "loadBoard"     ? "/load-board"
            : `/${portalKey.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}`;
  const rolesArr = JSON.stringify(roles[portalKey] ?? ["owner","admin"]);
  return `  { key:"${portalKey}", title:"${title}", path:"${path}", featureFlag:"${featureFlag}", roles:${rolesArr} },`;
}

function patchRegistryContent(src: string, portalKey: string) {
  if (src.includes(`key:"${portalKey}"`) || src.includes(`key: "${portalKey}"`)) {
    return { content: src, changed: false };
  }
  // Insert before the closing array bracket of PORTALS
  const marker = /export const PORTALS:\s*PortalDef\[\]\s*=\s*\[/;
  const start = src.search(marker);
  if (start === -1) throw new Error("PORTALS array not found in registry.ts");
  const closeIdx = src.lastIndexOf("]");
  const before = src.slice(0, closeIdx);
  const after = src.slice(closeIdx);
  const insertion = registryInsertSnippet(portalKey);
  const content = `${before}\n${insertion}\n${after}`;
  return { content, changed: true };
}

async function ensureRegistry(ctx: Ctx, branch: string, portalKey: string) {
  const regPath = "src/portals/registry.ts";
  assertAllowed(regPath, ctx.allowPaths ?? ALLOW);

  const file = await getFile(ctx.gh, regPath, branch);
  if (!file || !file.content) throw new Error("registry.ts not found or unreadable");
  const raw = decodeURIComponent(escape(atob(file.content)));
  const patched = patchRegistryContent(raw, portalKey);
  if (!patched.changed) return { updated: false };

  if (ctx.dryRun) return { updated: true, dryRun: true };

  await upsertFile(ctx.gh, regPath, patched.content, `feat(portal): register ${portalKey} in registry`, branch);
  return { updated: true };
}

export async function runEnsurePortal(ctx: Ctx, args: { portalKey: string; openPR?: boolean; dryRun?: boolean }) {
  const portalKey = args.portalKey;
  const branch = await ensureBranch(ctx.gh, `autobot/portal-${portalKey}-${new Date().toISOString().slice(0,10)}`);
  const s1 = await ensureScaffold(ctx, portalKey);
  const s2 = await ensureRegistry(ctx, branch, portalKey);
  let pr: unknown = null;

  if (!ctx.dryRun && (args.openPR ?? true)) {
    pr = await openPullRequest(ctx.gh, {
      branch,
      title: `feat(portal): provision ${portalKey} portal (scaffold + registry)`,
      body: `Adds scaffold page and registers **${portalKey}** in \`src/portals/registry.ts\`.\n\n- Safe, idempotent\n- Guarded by feature flags + role gates\n- Generated by Portal Dev Agent`,
    });
  }

  return { branch, scaffold: s1, registry: s2, pr };
}
