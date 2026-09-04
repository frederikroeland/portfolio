import { resolve } from 'node:path';
import { scan } from '../src/lib/privacy-guard.ts';

const distDir = resolve(process.cwd(), 'dist');

const matches = await scan(distDir);

if (matches.length > 0) {
  console.error('Privacy guard FAILED — forbidden content found in built site:');
  for (const m of matches) {
    console.error(`  [${m.kind}] "${m.match}" in ${m.file}`);
  }
  process.exit(1);
}

console.log('Privacy guard passed: no PII or denylisted client names in dist/.');
