import * as esbuild from 'https://deno.land/x/esbuild@v0.25.0/mod.js';
import { denoPlugins } from 'jsr:@luca/esbuild-deno-loader@0.11.1';

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
  entryPoints: ['./public/script.ts'],
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
