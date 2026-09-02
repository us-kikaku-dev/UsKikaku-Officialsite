
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // target未指定でViteデフォルト（es2020相当のbaseline）に委ねる。
    // esnext指定は企業ユーザーの古いブラウザ互換を狭めるため廃止（監査指摘）
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true,
  },
});