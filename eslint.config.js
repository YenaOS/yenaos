import nx from '@nx/eslint-plugin';
import prettierConfig from 'eslint-config-prettier';
import functionalPlugin from 'eslint-plugin-functional';
import importPlugin from 'eslint-plugin-import';
import testingLibraryPlugin from 'eslint-plugin-testing-library';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/react'],
  prettierConfig,
  testingLibraryPlugin.configs['flat/react'],
  functionalPlugin.configs.off,
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
      'functional/prefer-readonly-type': 'error',
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
          groups: [
            ['builtin', 'external'],
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          named: true,
          'newlines-between': 'always',
        },
      ],
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.tsx'],
        },
      ],
      'react/jsx-max-depth': [
        'error',
        {
          max: 5,
        },
      ],
      'react/jsx-no-bind': [
        'error',
        {
          allowArrowFunctions: true,
        },
      ],
      'react/jsx-no-literals': 'off',
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
    files: ['eslint.config.js'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    files: ['vite.config.ts', 'vitest.workspace.ts'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    files: ['**/*.(spec|test).(ts|js)'],
    rules: {},
  },
  {
    files: ['playwright.config.ts'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
];
