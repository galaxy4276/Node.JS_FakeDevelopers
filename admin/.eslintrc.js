module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {

  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
