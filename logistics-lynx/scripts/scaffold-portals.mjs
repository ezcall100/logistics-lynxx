#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const portals = [
  "super-admin","admin","tmsAdmin","onboarding",
  "broker","shipper","carrier","driver","owner-operator",
  "factoring","loadBoard","crm","financials","edi",
  "marketplace","analytics","autonomous","workers","rates","directory"
];

// Map folder names to actual dirs (owner-operator vs ownerOperator)
const folderMap = {
  "owner-operator": "owner-operator",
  "super-admin": "super-admin",
  "loadBoard": "loadBoard",
  "tmsAdmin": "tmsAdmin",
};

const pagesDir = path.resolve(__dirname, "../src/pages");

const scaffold = (title) => `import React from "react";
export default function Page(){return(
  <div className="max-w-5xl mx-auto p-6">
    <h1 className="text-2xl font-semibold mb-2">${title}</h1>
    <p className="text-muted-foreground">This portal is provisioned and protected by auth/roles/flags.</p>
  </div>
);}`

const titleFromKey = (key) =>
  key.split("-").map(s => s[0].toUpperCase()+s.slice(1)).join(" ");

for (const key of portals) {
  const folder = folderMap[key] ?? key;
  const dir = path.join(pagesDir, folder);
  const file = path.join(dir, "index.tsx");
  try {
    await fs.mkdir(dir, { recursive: true });
    try {
      await fs.access(file);
      // exists
    } catch {
      await fs.writeFile(file, scaffold(titleFromKey(key)), "utf8");
      console.log("Created:", path.relative(process.cwd(), file));
    }
  } catch (e) {
    console.error("Error scaffolding", key, e);
    process.exitCode = 1;
  }
}
