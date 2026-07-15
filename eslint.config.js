import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { includeIgnoreFile } from '@eslint/compat';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([
  includeIgnoreFile(new URL('.gitignore', import.meta.url).pathname),
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },

      globals: {
        ...globals.jest,
        ...globals.browser,
        ...globals.amd,
        ...globals.node
      }
    },

    settings: {
      react: {
        version: 'detect'
      }
    },

    extends: compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:prettier/recommended'
    ),

    rules: {
      'prettier/prettier': [
        'error',
        {},
        {
          usePrettierrc: true
        }
      ],

      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/no-onchange': 0,

      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton']
        }
      ]
    }
  }
]);
