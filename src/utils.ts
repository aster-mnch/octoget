export function parseGitHubURI(path: string): {
  owner: string;
  repo: string;
} {
  const pattern =
    /^(?<domain>https:\/\/github.com\/)?(?<owner>[\w.-]+)\/(?<repo>[\w.-]+)(?<subdir>[^#]+)?(?<ref>#[\w.\/@-]+)?/;
  const g = pattern.exec(path)?.groups;
  if (g?.owner == null || g?.repo == null) {
    throw new Error('Invalid format');
  }
  return {
    owner: g.owner,
    repo: g.repo,
  };
}
