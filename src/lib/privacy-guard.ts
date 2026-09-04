import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { clientDenylist, piiDenylist } from '../data/denylist.ts';

export interface GuardMatch {
  file: string;
  match: string;
  kind: 'client' | 'pii' | 'email' | 'phone';
}

const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;
// International or local phone numbers with 9+ digits and separators.
const PHONE_RE = /(?:\+?\d[\d\s().-]{8,}\d)/g;

// Domains that are legitimately present (LinkedIn, the resource library) and
// must not be mistaken for a personal email address.
const ALLOWED_AT_CONTEXT = /@(?:media|import|supports|keyframes|font-face)/i;

const SCANNED_EXTENSIONS = ['.html', '.js', '.xml', '.txt', '.svg'];

async function collectFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(full)));
    } else if (SCANNED_EXTENSIONS.some((ext) => entry.name.endsWith(ext))) {
      files.push(full);
    }
  }
  return files;
}

export interface Denylists {
  clients?: string[];
  pii?: string[];
}

export function scanText(file: string, text: string, denylists: Denylists = {}): GuardMatch[] {
  const clients = denylists.clients ?? clientDenylist;
  const pii = denylists.pii ?? piiDenylist;
  const matches: GuardMatch[] = [];

  for (const name of clients) {
    if (text.toLowerCase().includes(name.toLowerCase())) {
      matches.push({ file, match: name, kind: 'client' });
    }
  }

  for (const value of pii) {
    if (text.toLowerCase().includes(value.toLowerCase())) {
      matches.push({ file, match: value, kind: 'pii' });
    }
  }

  for (const email of text.match(EMAIL_RE) ?? []) {
    if (!ALLOWED_AT_CONTEXT.test(email)) {
      matches.push({ file, match: email, kind: 'email' });
    }
  }

  for (const phone of text.match(PHONE_RE) ?? []) {
    const digits = phone.replace(/\D/g, '');
    if (digits.length >= 9) {
      matches.push({ file, match: phone.trim(), kind: 'phone' });
    }
  }

  return matches;
}

/** Scan every text-based file under distDir for PII and denylisted client names. */
export async function scan(distDir: string): Promise<GuardMatch[]> {
  const files = await collectFiles(distDir);
  const results: GuardMatch[] = [];
  for (const file of files) {
    const text = await readFile(file, 'utf8');
    results.push(...scanText(file, text));
  }
  return results;
}
