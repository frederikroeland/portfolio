import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'node',
          include: ['tests/unit/**/*.test.ts'],
          exclude: ['tests/unit/**/dom-*.test.ts'],
          environment: 'node',
        },
      },
      {
        test: {
          name: 'dom',
          include: ['tests/unit/**/dom-*.test.ts'],
          environment: 'jsdom',
        },
      },
    ],
  },
});
