#!/usr/bin/env node
// Fails a production build if a "[[VERIFY" or "[[TODO" content-gap marker
// (see docs/CONTENT_GAPS.md) made it into rendered output. Runs as the
// "postbuild" script, after `next build` has written .next/server/app.

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..", ".next", "server", "app");
const MARKERS = ["[[VERIFY", "[[TODO"];
const SCAN_EXTENSIONS = [".html", ".rsc", ".meta"];

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (SCAN_EXTENSIONS.some((ext) => entry.name.endsWith(ext))) {
      yield full;
    }
  }
}

const hits = [];

for await (const file of walk(ROOT)) {
  const content = await readFile(file, "utf8");
  for (const marker of MARKERS) {
    if (content.includes(marker)) {
      hits.push({ file, marker });
    }
  }
}

if (hits.length > 0) {
  console.error("\nContent-gap markers reached rendered output:\n");
  for (const hit of hits) {
    console.error(`  ${hit.marker}  →  ${hit.file}`);
  }
  console.error("\nResolve these in docs/CONTENT_GAPS.md before shipping.\n");
  process.exit(1);
}

console.log("check-placeholders: no [[VERIFY / [[TODO markers in rendered output.");
