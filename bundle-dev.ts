import * as esbuild from 'esbuild';
import { denoPlugins } from 'esbuild-deno-loader';

await esbuild.build({
  plugins: [...denoPlugins()],
  entryPoints: ['./src/main.ts'],
  outfile: './src/main.js',
  bundle: true,
  platform: 'browser',
  format: 'esm',
  target: 'esnext',
  minify: true,
  sourcemap: false,
  treeShaking: true,
});

const ctx1 = await esbuild.context({
  entryPoints: ['./client/script.ts'],
  outfile: './public/script.min.js',
  bundle: true,
  platform: 'browser',
  format: 'esm',
  target: 'esnext',
  minify: true,
  sourcemap: false,
  treeShaking: true,
});

const ctx2 = await esbuild.context({
  plugins: [],
  entryPoints: ['./public/main.css'],
  outfile: './public/main.min.css',
  bundle: true,
  minify: true,
});

await Promise.all([ctx1.watch(), ctx2.watch()]);
