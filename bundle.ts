import * as esbuild from 'esbuild';

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
  entryPoints: ['./client/main.css'],
  outfile: './public/main.min.css',
  bundle: true,
  minify: true,
});

await esbuild.stop();
