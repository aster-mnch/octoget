import { mkdir, writeFile } from './fs';
import { Client, getEntries } from './github';
import type { DownloadOption, DownloadResult } from './types';
import { parseGitHubURI } from './utils';

export async function download(
  path: string,
  options?: DownloadOption,
): Promise<DownloadResult> {
  const { owner, repo } = parseGitHubURI(path);
  const dir = resolveDir(options?.dir);

  const client = new Client(options?.auth);

  let appDir: string | undefined;
  const appDirs = [''];
  // biome-ignore lint/suspicious/noAssignInExpressions: intended side effect
  while ((appDir = appDirs.pop()) != null) {
    const nextDirs = await fetchAndSaveEntries(
      client,
      { owner, repo, appDir },
      {
        force: options?.force,
        relativePath: dir,
      },
    );
    appDirs.push(...nextDirs);
  }

  return {
    source: `${owner}/${repo}`,
    dir,
  };
}

function resolveDir(dir: string | undefined): string {
  // TODO resolve path to download directory
  return dir ?? '.';
}

async function fetchAndSaveEntries(
  client: Client,
  graphqlArgs: {
    owner: string;
    repo: string;
    appDir: string;
  },
  options?: {
    force?: boolean;
    relativePath?: string;
  },
): Promise<string[]> {
  const nextDirs = [];

  // TODO check if the directory exists.
  await mkdir(graphqlArgs.appDir, options);

  const { entries } = await getEntries(client, graphqlArgs);
  for (const entry of entries) {
    switch (entry.type) {
      case 'blob':
        // TODO check if the file exists.
        await writeFile(entry.path, entry.object.text, options);
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
