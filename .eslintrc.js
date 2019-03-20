module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': 'off',
    'on-trailing-spaces': 'off',
    'space-before-function-paren': 'off',
    'comma-dangle': 'off',
    'max-len': 'off',
    'object-curly-newline': 'off',
    'no-param-reassign': ['error', { props: false }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
