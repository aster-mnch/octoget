import { defineCommand, runMain as runMainOrig } from 'citty';
import { process } from 'std-env';
import pkgInfo from '../package.json' assert { type: 'json' };
import { download } from './octoget';

const main = defineCommand({
  meta: {
    name: pkgInfo.name,
    version: pkgInfo.version,
    description: pkgInfo.description,
  },
  args: {
    path: {
      type: 'positional',
      description:
        'Repository identifier, specified as either `owner/repo` or a full URI.',
      required: true,
    },
    dir: {
      type: 'positional',
      description:
        'The target directory where the repository contents will be extracted.',
      required: false,
    },
    force: {
      type: 'boolean',
      description:
        'Download into an existing directory, overwriting its contents.',
    },
    auth: {
      type: 'string',
      description:
        'Use a custom authorization token for accessing private repositories. (Alternatively, set the `OCTOGET_AUTH` environment variable.)',
    },
  },
  async run({ args }) {
    const { path, dir, force } = args;

    const auth = args.auth ?? process.env.OCTOGET_AUTH;

    await download(path, {
      dir,
      force,
      auth,
    });
  },
});

export const runMain = () => runMainOrig(main);
