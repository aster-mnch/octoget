export function parseGitHubURI(path: string): string {
  const pattern =
    /^(?<domain>https:\/\/github.com\/)?(?<repo>[\w.-]+\/[\w.-]+)(?<subdir>[^#]+)?(?<ref>#[\w.\/@-]+)?/;
  const g = pattern.exec(path)?.groups;
  if (g?.repo == null) {
    throw new Error('Invalid format');
  }
  return g.repo;
}
