# 🐙 octoget

[![npm version](https://badge.fury.io/js/octoget.svg)](https://badge.fury.io/js/octoget)

`octoget` is a CLI and code library for downloading GitHub repositories using the GitHub GraphQL API.

## Why `octoget`?

In many cases, you should use `git` command or [unjs/giget](https://github.com/unjs/giget). However, `octoge` can be useful when these don't work well.

For example, [WebContainers](https://webcontainers.io/) doesn't have `git` command and throws CORS error when using `giget`. (`giget` uses [GitHub archive API](https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#download-a-repository-archive-tar), and this redirects to `codeload.github.com` domain, which does not support Cross-Origin Resource Sharing.)

## Usage (CLI)

```sh
npx octoget@latest <path> [<dir>] [...options]
```

### Arguments

- **path**: Repository identifier, specified as either `owner/repo` (e.g., `aster-mnch/octoget`) or a full URI (e.g., https://github.com/aster-mnch/octoget).
- **dir**: The target directory where the repository contents will be extracted.

### Options

- `--force`: Download into an existing directory, overwriting its contents.
- `--auth`: Use a custom authorization token for using GitHub GraphQL API. (Alternatively, set the `OCTOGET_AUTH` environment variable.)

### Examples

```sh
# Download a public repository to the current directory
OCTOGET_AUTH=ghu_XXXXX npx octoget@latest aster-mnch/octoget

# Download a repository to a specified directory
OCTOGET_AUTH=ghu_XXXXX npx octoget@latest aster-mnch/octoget path/to/dir
```

## Usage (Code)

### Installation

To install `octoget` in your project, use one of the following:

```sh
# npm
npm install octoget

# yarn
yarn install octoget

# pnpm
pnpm install octoget
```

### Importing the Module

```js
// ESM
import { download } from 'octoget';

// CommonJS
import { download } = require('octoget');
```

### `download(path, options?)`

The function downloads a GitHub repository and saves it to a specified directory.

#### Parameters:

- **path**: (string) The repository to download, specified as `owner/repo` or a full URL.
- **options**: (object) An optional object containing:
  - **dir**: (string) The directory to which the repository will be downloaded.
  - **force**: (boolean) If `true`, allows downloading into an existing directory.
  - **auth**: (string) Authorization token for using GitHub GraphQL API.

#### Example Usage:

```js
const { source, dir } = await download('aster-mnch/octoget', {
  dir: 'path/to/dir',
  force: true,
  auth: 'ghu_XXXXX',
});
```

#### Return Value:

The function returns a promise that resolves with an object containing:

- **dir**: (string) The path where the repository was extracted.
- **source**: (string) The identifier of the downloaded repository.

## License

Under the [MIT License](./LICENSE).
