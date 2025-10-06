import * as esbuild from 'esbuild';
import { denoPlugins } from 'esbuild-deno-loader';

await esbuild.build({
  plugins: [...denoPlugins()],
  entryPoints: ['./src/main.ts'],
  outfile: './src/main.js',
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'esnext',
  minify: true,
  sourcemap: false,
  treeShaking: true,
});

await esbuild.stop();
