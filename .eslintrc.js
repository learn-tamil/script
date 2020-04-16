module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
  rules: {},
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};
