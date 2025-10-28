import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';

export default [
  // Ignorar o próprio arquivo de configuração
  { ignores: ['eslint.config.mjs', '**/jest.config.ts', '**/jest.config.js', '**/tsconfig*.json'] },

  // Configuração base recomendada
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  prettierRecommended,

  // Configuração global para Node, Jest, TypeScript
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Configuração para libs compartilhadas
  {
    files: ['libs/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './libs/**/tsconfig.lib.json', // Cada lib pode ter seu próprio tsconfig
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/no-extraneous-dependencies': ['error', { packageDir: ['./'] }],
      'no-console': 'warn',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      eqeqeq: 'error',
      curly: 'error',
      // Regras do typescript-eslint
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // SUPRESSÃO DE ALERTAS NOS TESTES
  {
    files: ['test/**/*.ts', '**/*.spec.ts', '**/*.e2e-spec.ts'],
    languageOptions: {
      parserOptions: {
        project: './apps/users/tsconfig.spec.json',
        tsconfigRootDir: import.meta.dirname,
        allowDefaultProject: true,
      },
    },
    rules: {
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      // Adicione outras regras que deseja desabilitar nos testes
    },
  },

  // Configuração para cada app (exemplo: users, auth, tasks, api-gateway)
  ...['users', 'auth', 'tasks', 'api-gateway'].map((app) => ({
    files: [`apps/${app}/src/**/*.ts`],
    languageOptions: {
      parserOptions: {
        project: `./apps/${app}/tsconfig.app.json`,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/no-extraneous-dependencies': ['error', { packageDir: ['./'] }],
      'no-console': 'warn',
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      eqeqeq: 'error',
      curly: 'error',
      // Regras do typescript-eslint
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  })),
];
