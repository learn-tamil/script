import typescriptEslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  ...typescriptEslint.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      parser: typescriptEslint.parser,
      ecmaVersion: 2018,
      sourceType: 'module',
    },
  },
];
