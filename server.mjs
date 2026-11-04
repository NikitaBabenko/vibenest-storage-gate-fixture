import http from 'node:http';
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
const dir = process.env.DATA_DIR || '/app/data';
mkdirSync(dir, { recursive: true });
const file = `${dir}/acceptance.json`;
const state = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : { marker: randomUUID(), boots: 0 };
state.boots += 1;
writeFileSync(file, JSON.stringify(state));
http.createServer((req, res) => {
  res.writeHead(req.url === '/' || req.url === '/health' ? 200 : 404, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify({ fixture: 'required-storage', ...state }));
}).listen(3000, '0.0.0.0');
