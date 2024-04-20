import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2018,
      sourceType: 'module',
    },
  },
];
