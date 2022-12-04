module.exports = {
  "env": {
      "browser": true,
      "es6": true
  },
  "extends": ["plugin:compat/recommended","eslint:recommended"],
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parser": 'babel-eslint',
  "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module",
      "allowImportExportEverywhere": true
  },
  "rules": {
    'global-require': ['on'],
  }
};