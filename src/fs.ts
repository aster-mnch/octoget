import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import { resolve } from 'pathe';

export async function mkdir(
  dir: string,
  options?: {
    force?: boolean;
    relativePath?: string;
  },
) {
  const path = resolve(options?.relativePath ?? '.', dir);
  await fs.promises.mkdir(path, { recursive: true });
}

export async function writeFile(
  path: string,
  content: string,
  options?: {
    force?: boolean;
    relativePath?: string;
  },
) {
  const filepath = resolve(options?.relativePath ?? '.', path);
  const data = new Uint8Array(Buffer.from(content));
  await fs.promises.writeFile(filepath, data);
}
