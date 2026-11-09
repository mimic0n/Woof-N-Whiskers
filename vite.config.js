import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  esbuild: { jsx: 'automatic' },
  // Bind the live CSS pipeline to v4 explicitly. The v3 alias is only used
  // by scripts/build-demo-home-css.cjs, never by the application's server.
  css: { postcss: { plugins: [tailwindcss(), autoprefixer()] } },
  server: { host: '0.0.0.0', port: 8000 },
});
