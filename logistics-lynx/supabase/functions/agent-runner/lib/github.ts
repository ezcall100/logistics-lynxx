// Minimal GitHub Content/PR API client for Deno Edge (ESM)
const GH_API = "https://api.github.com";

type GhCtx = {
  token: string;
  owner: string;
  repo: string;
  defaultBranch: string; // e.g. "main"
};

function headers(token: string) {
  return {
    "Authorization": `Bearer ${token}`,
    "Accept": "application/vnd.github+json",
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export async function getFile(ctx: GhCtx, path: string, ref?: string) {
  const url = `${GH_API}/repos/${ctx.owner}/${ctx.repo}/contents/${encodeURIComponent(path)}${ref ? `?ref=${ref}` : ""}`;
  const res = await fetch(url, { headers: headers(ctx.token) });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub getFile failed ${res.status}: ${await res.text()}`);
  return await res.json(); // { content, sha, ... } or array
}

async function getBranchSha(ctx: GhCtx, branch: string) {
  const url = `${GH_API}/repos/${ctx.owner}/${ctx.repo}/git/ref/heads/${branch}`;
  const r = await fetch(url, { headers: headers(ctx.token) });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`getBranchSha failed ${r.status}: ${await r.text()}`);
  const j = await r.json();
  return j.object?.sha as string | null;
}

export async function ensureBranch(ctx: GhCtx, branch: string) {
  const baseSha = await getBranchSha(ctx, branch);
  if (baseSha) return branch;
  const mainSha = await getBranchSha(ctx, ctx.defaultBranch);
  if (!mainSha) throw new Error(`Default branch not found: ${ctx.defaultBranch}`);
  const url = `${GH_API}/repos/${ctx.owner}/${ctx.repo}/git/refs`;
  const res = await fetch(url, {
    method: "POST",
    headers: headers(ctx.token),
    body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: mainSha }),
  });
  if (!res.ok) throw new Error(`ensureBranch failed ${res.status}: ${await res.text()}`);
  return branch;
}

export async function upsertFile(ctx: GhCtx, path: string, content: string, message: string, branch: string) {
  const existing = await getFile(ctx, path, branch);
  const b64 = btoa(unescape(encodeURIComponent(content)));
  const url = `${GH_API}/repos/${ctx.owner}/${ctx.repo}/contents/${encodeURIComponent(path)}`;
  const body: Record<string, unknown> = { message, content: b64, branch };
  if (existing?.sha) body.sha = existing.sha;
  const res = await fetch(url, { method: "PUT", headers: headers(ctx.token), body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`upsertFile failed ${res.status}: ${await res.text()}`);
  return await res.json();
}

export async function openPullRequest(ctx: GhCtx, params: { branch: string; title: string; body?: string; base?: string }) {
  const base = params.base ?? ctx.defaultBranch;
  const url = `${GH_API}/repos/${ctx.owner}/${ctx.repo}/pulls`;
  const res = await fetch(url, {
    method: "POST",
    headers: headers(ctx.token),
    body: JSON.stringify({ head: params.branch, base, title: params.title, body: params.body ?? "" }),
  });
  if (!res.ok) throw new Error(`openPullRequest failed ${res.status}: ${await res.text()}`);
  return await res.json();
}
