import { mkdir, writeFile } from './fs';
import { Client, getEntries } from './gh';
import type { DownloadOption, DownloadResult } from './types';

export async function download(
  path: string,
  options?: DownloadOption,
): Promise<DownloadResult> {
  const source = extractSource(path);
  const dir = resolveDir(options?.dir);

  const client = new Client();
  if (options?.auth != null) {
    client.setAuth(options.auth);
  }

  let appDir: string | undefined;
  const appDirs = [''];
  while ((appDir = appDirs.pop()) != null) {
    const nextDirs = await fetchAndSaveEntries(client, source, appDir, {
      force: options?.force,
      relativePath: dir,
    });
    appDirs.push(...nextDirs);
  }

  return {
    source,
    dir,
  };
}

function extractSource(path: string): string {
  // TODO extract repository source string from path
  // `aster-mnch/octoget` -> `aster-mnch/octoget`
  // `https://github.com/aster-mnch/octoget` -> `aster-mnch/octoget`
  return path;
}

function resolveDir(dir: string | undefined): string {
  // TODO resolve path to download directory
  return dir ?? '.';
}

async function fetchAndSaveEntries(
  client: Client,
  source: string,
  appDir: string,
  options?: {
    force?: boolean;
    relativePath?: string;
  },
): Promise<string[]> {
  const nextDirs = [];

  // TODO check if the directory exists.
  await mkdir(appDir, options);

  const { entries } = await getEntries(client, source, { appDir });
  for (const entry of entries) {
    switch (entry.type) {
      case 'blob':
        // TODO check if the file exists.
        await writeFile(entry.path, entry.object.content, options);
        break;
      case 'tree':
        nextDirs.push(entry.path);
        break;
      default:
        throw new Error('TreeEntry returns unknown type');
    }
  }

  return nextDirs;
}
