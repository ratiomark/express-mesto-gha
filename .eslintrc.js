module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: [
    'airbnb-base',
  ],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'no-underscore-dangle': [2, { allow: ['_id'] }],
  },
};
