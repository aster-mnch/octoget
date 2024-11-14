import { Octokit } from '@octokit/core';

// https://docs.github.com/graphql/reference/objects#treeentry
type TreeEntry = {
  path: string;
  type: 'blob' | 'tree';
  object: {
    content: string;
  };
};

// TODO
export class Client {
  #octokit: Octokit;

  constructor(auth: string | undefined) {
    this.#octokit = new Octokit({ auth });
  }

  get graphql() {
    return this.#octokit.graphql;
  }
}

export async function getEntries(
  client: Client,
  graphqlArgs: {
    owner: string;
    repo: string;
    appDir: string;
  },
): Promise<{
  entries: TreeEntry[];
}> {
  // TODO request GitHub GraphQL API
  return {
    entries: [],
  };
}
