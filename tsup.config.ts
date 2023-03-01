import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/node/cli.ts', 'sr/node/index.ts'],
  bundle: true,
  splitting: true,
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true,
  shims: true,
  clean: true
});
