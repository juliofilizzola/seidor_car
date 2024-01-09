module.exports = {
  env: {
    browser: true ,
    es6: true ,
    node: true ,
  } ,
  extends: [
    'eslint:recommended' ,
    'plugin:@typescript-eslint/eslint-recommended' ,
    'plugin:@typescript-eslint/recommended' ,
  ] ,
  globals: {
    Atomics: 'readonly' ,
    SharedArrayBuffer: 'readonly' ,
  } ,
  parser: '@typescript-eslint/parser' ,
  parserOptions: {
    ecmaVersion: 11 ,
    sourceType: 'module' ,
  } ,
  plugins: ['@typescript-eslint'] ,
  rules: {
    quotes: ['error' , 'single'] ,
    'no-throw-literal': 1 ,
    '@typescript-eslint/no-unused-vars': 0 ,
    'linebreak-style': 0 ,
    semi: ['error' , 'always'] ,
    'no-console': ['off'] ,
  } ,
};