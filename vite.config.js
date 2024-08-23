import { defineConfig } from 'vite';

export default defineConfig({
  root: './', // Корневая директория проекта
  build: {
    outDir: 'dist', // Директория для сборки
  },
  server: {
    host: 'localhost',
    port: 3000, // Порт для сервера разработки
  },
});