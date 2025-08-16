import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  {
    ignores: [
      'dist', 
      'node_modules', 
      '*.config.js', 
      '*.config.ts',
      'test-*.js',
      'test-*.ts',
      '*.test.js',
      '*.test.ts',
      '*.spec.js',
      '*.spec.ts',
      'start-*.js',
      'supabase/functions/**/*.js',
      'supabase/functions/**/*.ts',
      '*.cjs',
      '*.mjs',
      'scripts/**/*',
      'k6/**/*',
      'fix-*.js',
      'check-*.js',
      '*.cjs',
      'public-website/next.config.js',
      'public-website/postcss.config.js',
      'public-website/tailwind.config.js',
      'server/**/*'
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        setTimeout: 'readonly',
        fetch: 'readonly',
        URL: 'readonly'
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // React
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': ['warn', {
        additionalHooks: '(useAsyncEffect|useDebounced|useEvent|useDerived|useStableCallback)'
      }],

      // Fast Refresh friendliness
      'react-refresh/only-export-components': ['warn', {
        allowConstantExport: true,
        allowExportNames: [
          'metadata','generateMetadata','viewport','dynamic','dynamicParams',
          'revalidate','fetchCache','preferredRegion','runtime','maxDuration',
          'config','generateStaticParams',
          'useAuth','useRole','useRoleContext','useTheme','useSidebar',
          'AuthProvider','RoleProvider','ThemeProvider'
        ]
      }],

      // Be very lenient for development phase
      '@typescript-eslint/no-unused-vars': 'off',
      'no-console': 'off',
      'no-undef': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'no-useless-escape': 'off',
    },
  },
  {
    files: ['**/*.{stories,test,spec}.{ts,tsx}', '**/__examples__/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  }
);

