import {defineConfig} from 'vite';

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist'
  },
  server: {
    host: 'localhost',
    port: 3000
  }
});
