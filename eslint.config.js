import typescriptEslint from 'typescript-eslint';

export default [
  {
    languageOptions: {
      parser: typescriptEslint.parser,
      ecmaVersion: 2018,
      sourceType: 'module',
    },
  },
];
