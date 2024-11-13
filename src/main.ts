import { defineCommand, runMain } from 'citty'
import pkgInfo from '../package.json' assert { type: 'json' }

export const main = defineCommand({
  meta: {
    name: pkgInfo.name,
    description: pkgInfo.description,
  },
  args: {
    path: {
      type: 'positional',
      description: 'Repository identifier, specified as either `owner/repo` or a full URI.',
      required: true,
    },
    dir: {
      type: 'positional',
      description: 'The target directory where the repository contents will be extracted.',
      required: false,
    },
    force: {
      type: 'boolean',
      description: 'Download into an existing directory, overwriting its contents.',
    },
    auth: {
      type: 'string',
      description: 'Use a custom authorization token for accessing private repositories.',
    }
  },
  run({ args }) {
    // TODO
  },
});

runMain(main);
