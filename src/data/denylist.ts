/**
 * Client names and personal contact details that must never appear in the built
 * site (FR-011, FR-018). The real values are deliberately kept OUT of version
 * control — they load at build/test time from `denylist.local.json` (gitignored;
 * copy `denylist.local.example.json`). In CI, materialise the same file from a
 * secret so the guard enforces the full list. When the file is absent, the guard
 * still catches any email/phone address via its regex patterns.
 *
 * Node-only: consumed by the build-time privacy guard and tests, never bundled
 * into client-side JavaScript.
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

interface LocalDenylist {
  clients?: string[];
  pii?: string[];
}

function loadLocalDenylist(): LocalDenylist {
  try {
    const localFile = join(dirname(fileURLToPath(import.meta.url)), 'denylist.local.json');
    if (existsSync(localFile)) {
      return JSON.parse(readFileSync(localFile, 'utf8')) as LocalDenylist;
    }
  } catch {
    // Ignore a missing or malformed local file; regex-based PII checks still run.
  }
  return {};
}

const local = loadLocalDenylist();

export const clientDenylist: string[] = [...(local.clients ?? [])];

export const piiDenylist: string[] = [...(local.pii ?? [])];
