import { graphql } from '@octokit/graphql';

// https://docs.github.com/graphql/reference/objects#treeentry
type TreeEntry = {
  path: string;
  type: 'blob' | 'tree';
  object: {
    /** UTF8 text data or null if the Blob is binary. */
    text: string | null;
    /** Indicates whether the Blob is binary or text. Returns null if unable to determine the encoding. */
    isBinary: boolean;
  };
};

// TODO
export class Client {
  #_graphql: typeof graphql;

  constructor(auth: string | undefined) {
    this.#_graphql = graphql.defaults({
      headers: {
        authorization: `bearer ${auth}`,
      },
    });
  }

  get graphql() {
    return this.#_graphql;
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
