import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  rollup: {
    emitCJS: true,
  },
  entries: ['src/index.ts', 'src/main.ts'],
});
