/* eslint-env node */
/* global module */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'react-refresh'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'warn',
    'prefer-const': 'error',
    'react-refresh/only-export-components': ['warn', { 'allowConstantExport': true }],
    'react-hooks/exhaustive-deps': 'off'
  },
  overrides: [
    {
      files: ['public-website/**/*.{ts,tsx}'],
      rules: {
        'react-refresh/only-export-components': 'off'
      }
    },
    {
      files: ['**/*.stories.*', '**/*.test.*', '**/__examples__/**'],
      rules: {
        'react-refresh/only-export-components': 'off'
      }
    },
    {
      files: ['setup-*.js'],
      env: {
        node: true
      },
      rules: {
        'no-undef': 'off',
        'no-console': 'off',
        'no-process-exit': 'off',
        '@typescript-eslint/no-explicit-any': 'off'
      }
    },
    {
      files: ['src/**/*.{ts,tsx}'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-require-imports': 'warn',
        'react-hooks/exhaustive-deps': 'off'
      }
    },
    {
      files: ['src/agents/**/*.{ts,tsx}', 'autonomous-system/**/*.{ts,tsx}'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-require-imports': 'error',
        'react-hooks/exhaustive-deps': 'off'
      }
    }
  ]
};
