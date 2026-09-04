import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const DIST = resolve(process.cwd(), 'dist');
const port = Number(process.argv[2] ?? process.env.PORT ?? 4321);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  let target = normalize(join(DIST, clean));
  if (!target.startsWith(DIST)) return null;
  try {
    const info = await stat(target);
    if (info.isDirectory()) target = join(target, 'index.html');
  } catch {
    if (!extname(target)) target = `${target}.html`;
  }
  return target;
}

const server = createServer(async (req, res) => {
  const target = await resolveFile(req.url ?? '/');
  if (!target) {
    res.writeHead(403).end('Forbidden');
    return;
  }
  try {
    const body = await readFile(target);
    res.writeHead(200, {
      'content-type': MIME[extname(target)] ?? 'application/octet-stream',
      'content-length': body.byteLength,
    });
    res.end(body);
  } catch {
    try {
      const notFound = await readFile(join(DIST, '404.html'));
      res.writeHead(404, { 'content-type': MIME['.html'] });
      res.end(notFound);
    } catch {
      res.writeHead(404).end('Not found');
    }
  }
});

server.listen(port, () => {
  process.stdout.write(`Serving dist/ at http://localhost:${port}\n`);
});
