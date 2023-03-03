import { defineConfig } from 'tsup';

export default defineConfig({
  // TODO: use entry?
  // entry: ['src/node/cli.ts', 'src/node/index.ts', 'src/node/dev.ts],
  entryPoints: {
    cli: 'src/node/cli.ts',
    index: 'src/node/index.ts',
    dev: 'src/node/dev.ts'
  },
  bundle: true,
  splitting: true,
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
  shims: true,
  clean: true
});
