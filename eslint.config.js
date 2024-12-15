const nx = require('@nx/eslint-plugin');
const prettierConfig = require('eslint-config-prettier');
const importPlugin = require('eslint-plugin-import');
const reactPlugin = require('eslint-plugin-react');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  reactPlugin.configs.flat.all,
  reactPlugin.configs.flat['jsx-runtime'],
  prettierConfig,
  {
    ignores: ['**/dist'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/first': 'error',
      'import/namespace': 'error',
      'import/newline-after-import': 'error',
      'import/no-default-export': 'error',
      'import/no-duplicates': 'error',
      'import/no-namespace': 'error',
      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },
          named: true,
          'newlines-between': 'always',
        },
      ],
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      'react/jsx-max-depth': ['error', { max: 5 }],
      'react/jsx-no-bind': [
        'error',
        {
          allowArrowFunctions: true,
        },
      ],
      'react/jsx-no-literals': ['off'],
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
    },
    settings: {
      import: {
        'internal-regex': '^@yenaos/',
      },
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['vite.config.ts'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    files: ['playwright.config.ts'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
];
