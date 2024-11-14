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
  #auth: string;

  setAuth(auth: string) {
    this.#auth = auth;
  }
}

export async function getEntries(
  client: Client,
  source: string,
  options: {
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
