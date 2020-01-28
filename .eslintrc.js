module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/strongly-recommended', 'standard'],
  plugins: [
    'vue'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/max-attributes-per-line': [1, {
      'singleline': 3,
      'multiline': 3
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  'globals': {
    '_': false
  }
}
