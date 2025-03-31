import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 👇 Allow using @declarations instead of relative paths
      '@declarations': path.resolve(__dirname, '../declarations'),
    },
  },
});
