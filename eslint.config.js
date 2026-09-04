import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**', 'playwright-report/**', 'test-results/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
  },
  {
    files: ['src/scripts/**/*.ts'],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
  {
    files: ['**/*.mjs'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
);
