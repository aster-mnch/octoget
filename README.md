# 🐙 octoget

`octoget` is a CLI and code library for downloading GitHub repositories using the GitHub GraphQL API.

## Usage (CLI)

```sh
npx octoget@latest <path> [<dir>] [...options]
```

### Arguments

- **path**: Repository identifier, specified as either `owner/repo` (e.g., `aster-mnch/octoget`) or a full URI (e.g., https://github.com/aster-mnch/octoget).
- **dir**: The target directory where the repository contents will be extracted.

### Options

- `--force`: Download into an existing directory, overwriting its contents.
- `--auth`: Use a custom authorization token for accessing private repositories. (Alternatively, set the `OCTOGET_AUTH` environment variable.)

### Examples

```sh
# Download a public repository to the current directory
npx octoget@latest aster-mnch/octoget

# Download a repository to a specified directory
npx octoget@latest aster-mnch/octoget path/to/dir

# Download a private repository with an authorization token
npx octoget@latest aster-mnch/private-repository --auth=ghu_XXXXX
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

### `download(source, options?)`

The function downloads a GitHub repository and saves it to a specified directory.

#### Parameters:

- **source**: (string) The repository to download, specified as `owner/repo` or a full URL.
- **options**: (object) An optional object containing:
  - **dir**: (string) The directory to which the repository will be downloaded.
  - **force**: (boolean) If `true`, allows downloading into an existing directory.
  - **auth**: (string) Authorization token for accessing private repositories.

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
