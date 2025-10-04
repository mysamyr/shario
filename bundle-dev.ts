import * as esbuild from 'esbuild';

const script = await esbuild.context({
  entryPoints: ['./client/script.ts'],
  outfile: './public/script.min.js',
  bundle: true,
  platform: 'browser',
  format: 'esm',
  target: 'esnext',
  minify: false,
  sourcemap: true,
  treeShaking: true,
});

const styles = await esbuild.context({
  plugins: [],
  entryPoints: ['./client/main.css'],
  outfile: './public/main.min.css',
  bundle: true,
  minify: false,
});

await Promise.all([script.watch(), styles.watch()]);
