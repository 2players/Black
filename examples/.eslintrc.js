module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
  ],
  rules: {
    semi: ['error', 'never'],
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  settings: {
    'import/resolver': 'webpack',
  },
}
