import { Octokit } from '@octokit/core';

// https://docs.github.com/graphql/reference/objects#treeentry
type TreeEntry = {
  path: string;
  type: 'blob' | 'tree';
  object: {
    text: string;
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
  const { appDir, ...restArgs } = graphqlArgs;
  // TODO Allow specifying revision other than `HEAD`.
  const expression = `HEAD:${appDir}`;

  const response = await client.graphql<{
    repository: {
      object: {
        entries: TreeEntry[];
      };
    };
  }>(
    `query TreeEntries($owner: String!, $repo: String!, $expression: String!) {
      repository(owner: $owner, name: $repo) {
        object(expression: $expression) {
          ... on Tree {
            entries {
              path
              type
              object {
                ... on Blob {
                  text
                  isBinary
                }
              }
            }
          }
        }
      }
    }`,
    {
      ...restArgs,
      expression,
    },
  );

  return {
    entries: response.repository.object.entries,
  };
}
