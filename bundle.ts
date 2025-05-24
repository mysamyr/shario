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

await esbuild.build({
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

await esbuild.build({
  plugins: [],
  entryPoints: ['./public/main.css'],
  outfile: './public/main.min.css',
  bundle: true,
  minify: true,
});

await esbuild.stop();
