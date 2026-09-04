import { spawnSync } from 'node:child_process';
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import * as esbuild from 'esbuild';
import posthtml from 'posthtml';
import include from 'posthtml-include';
import { engagements } from './src/data/engagements.ts';
import { expertise } from './src/data/expertise.ts';
import { insights } from './src/data/insights.ts';
import { recognitions } from './src/data/recognitions.ts';
import { careerHistory, currentRole, site } from './src/data/site.ts';
import { generateCv } from './src/lib/cv.ts';
import {
  renderEngagements,
  renderExpertise,
  renderExperience,
  renderInsights,
  renderOutcomes,
  renderRecognitions,
  renderWorkCta,
  renderWorkHeader,
} from './src/lib/render.ts';

const ROOT = process.cwd();
const SRC = resolve(ROOT, 'src');
const DIST = resolve(ROOT, 'dist');
const PAGES = resolve(SRC, 'pages');

function attr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

interface PageDef {
  src: string;
  out: string;
  root: string;
  title: string;
  description: string;
  slots: Record<string, string>;
}

function buildPageDefs(): PageDef[] {
  const homeSlots: Record<string, string> = {
    currentRoleOutcomes: renderOutcomes(currentRole.outcomes),
    experience: renderExperience(careerHistory),
    expertise: renderExpertise(expertise),
    engagements: renderEngagements(engagements, ''),
    insights: renderInsights(insights),
    recognitions: renderRecognitions(recognitions),
  };

  const defs: PageDef[] = [
    {
      src: join(PAGES, 'index.html'),
      out: join(DIST, 'index.html'),
      root: '',
      title: `${site.name} — ${site.title}`,
      description: site.valueProposition,
      slots: homeSlots,
    },
    {
      src: join(PAGES, '404.html'),
      out: join(DIST, '404.html'),
      root: '',
      title: `Page not found — ${site.name}`,
      description: 'The page you were looking for could not be found.',
      slots: {},
    },
  ];

  for (const engagement of engagements) {
    defs.push({
      src: join(PAGES, 'work', `${engagement.slug}.html`),
      out: join(DIST, 'work', `${engagement.slug}.html`),
      root: '../',
      title: `${engagement.title} — ${site.name}`,
      description: engagement.summary,
      slots: {
        workHeader: renderWorkHeader(engagement, '../'),
        workCta: renderWorkCta('../'),
      },
    });
  }

  return defs;
}

function canonicalFor(outRelToDist: string): string {
  const rel = outRelToDist === 'index.html' ? '' : outRelToDist;
  return `${site.siteUrl}/${rel}`.replace(/\/$/, '/');
}

async function renderPage(def: PageDef): Promise<void> {
  const source = await readFile(def.src, 'utf8');
  const processed = await posthtml([include({ root: SRC })]).process(source);
  let html = processed.html;

  for (const [name, value] of Object.entries(def.slots)) {
    html = html.split(`<!--slot:${name}-->`).join(value);
  }

  const outRel = def.out
    .slice(DIST.length + 1)
    .split('\\')
    .join('/');
  const canonical = canonicalFor(outRel);
  const ogImage = `${site.siteUrl}/${site.ogImage}`;

  html = html
    .split('@@TITLE@@')
    .join(attr(def.title))
    .split('@@DESC@@')
    .join(attr(def.description))
    .split('@@CANONICAL@@')
    .join(attr(canonical))
    .split('@@OG_IMAGE@@')
    .join(attr(ogImage))
    .split('@@ROOT@@')
    .join(def.root);

  await mkdir(dirname(def.out), { recursive: true });
  await writeFile(def.out, html, 'utf8');
}

async function writeSitemap(defs: PageDef[]): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);
  const urls = defs
    .filter((d) => !d.out.endsWith('404.html'))
    .map((d) => {
      const outRel = d.out
        .slice(DIST.length + 1)
        .split('\\')
        .join('/');
      return `  <url><loc>${canonicalFor(outRel)}</loc><lastmod>${today}</lastmod></url>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(join(DIST, 'sitemap.xml'), xml, 'utf8');
}

function runTailwind(): void {
  const result = spawnSync(
    'npx',
    ['@tailwindcss/cli', '-i', 'src/styles/input.css', '-o', 'dist/assets/styles.css', '--minify'],
    { stdio: 'inherit', shell: true },
  );
  if (result.status !== 0) {
    throw new Error(`Tailwind CLI failed with status ${result.status}`);
  }
}

async function main(): Promise<void> {
  await rm(DIST, { recursive: true, force: true });
  await mkdir(join(DIST, 'assets'), { recursive: true });
  await mkdir(join(DIST, 'work'), { recursive: true });
  await mkdir(join(DIST, 'cv'), { recursive: true });

  await cp(resolve(ROOT, 'public'), DIST, { recursive: true });

  runTailwind();

  await esbuild.build({
    entryPoints: [resolve(SRC, 'scripts/main.ts')],
    bundle: true,
    minify: true,
    format: 'iife',
    target: ['es2020'],
    outfile: join(DIST, 'assets', 'main.js'),
  });

  await generateCv(join(DIST, 'cv', 'frederik-roeland-cv-redacted.pdf'));

  const defs = buildPageDefs();
  for (const def of defs) {
    await renderPage(def);
  }

  await writeSitemap(defs);

  const pageCount = defs.length;
  const workFiles = (await readdir(join(DIST, 'work'))).length;
  console.log(`Built ${pageCount} pages (${workFiles} case studies) to dist/.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
