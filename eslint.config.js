const nx = require('@nx/eslint-plugin');
const reactPlugin = require('eslint-plugin-react');
const prettierConfig = require('eslint-config-prettier');

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
    rules: {
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
  },
];
