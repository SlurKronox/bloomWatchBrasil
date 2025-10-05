// slurkronox/bloomwatch-brasil-techers/bloomwatch-brasil-techers-ac71067e3e30b0cb7c9e5e21329805911e61af62/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});