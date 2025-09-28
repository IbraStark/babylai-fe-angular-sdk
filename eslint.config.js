import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        createDefaultProgram: true,
      },
      globals: {
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        fetch: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        URL: 'readonly',
        XMLHttpRequest: 'readonly',
        navigator: 'readonly',
        performance: 'readonly',
        Worker: 'readonly',
        AbortController: 'readonly',
        Element: 'readonly',
        Node: 'readonly',
        Zone: 'readonly',
        ngDevMode: 'readonly',
        ngI18nClosureMode: 'readonly',
        goog: 'readonly',
        $localize: 'readonly',
        COMPILED: 'readonly',
        Hammer: 'readonly',
        WorkerGlobalScope: 'readonly',
        self: 'readonly',
        global: 'readonly',
        Prism: 'readonly',
        resolveComponentResources: 'readonly'
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'import': importPlugin,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'error',
      'import/no-relative-parent-imports': 'error',
      'import/no-relative-packages': 'error',
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/**/*',
              from: './src/**/*',
              except: ['./src/**/index.ts', './src/**/public_api.ts'],
              message: 'Use @ imports instead of relative imports'
            }
          ]
        }
      ]
    },
  },
  {
    ignores: [
      'dist/**', 
      'node_modules/**', 
      'projects/**',
      '.angular/**',
      '**/*.d.ts',
      '**/public_api.ts'
    ]
  }
];
