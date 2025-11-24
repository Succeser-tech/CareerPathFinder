import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api/hf': {
        target: 'https://api-inference.huggingface.co/models',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/hf/, ''),
        secure: false,
      },
    },
  },
});
