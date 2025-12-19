import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./client/src/test/setup.ts'],
    include: ['client/src/**/*.test.ts', 'client/src/**/*.test.tsx'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'text-summary'],
      include: ['client/src/**/*.{ts,tsx}'],
      exclude: [
        'node_modules/',
        'client/src/test/',
        'client/src/**/*.test.ts',
        'client/src/**/*.test.tsx',
        'client/src/components/examples/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@shared': path.resolve(__dirname, './shared'),
    },
  },
});
