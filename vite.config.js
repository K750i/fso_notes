import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/notes': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        // secure: false,
      },
      '/api/login': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        // secure: false,
      },
    },
  },
});
