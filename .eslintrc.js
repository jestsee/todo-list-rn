module.exports = {
  env: {
    es2021: true,
    node: true,
    'react-native/react-native': true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'react-native', '@typescript-eslint', 'prettier'],
  rules: {
    indent: ['warn', 2],
    'linebreak-style': ['error', 'windows'],
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'crlf'
      }
    ],
    quotes: ['error', 'single'],
    'react-native/no-raw-text': 1,
    'react-native/no-unused-styles': 1,
    'react-native/sort-styles': ['error', 'asc'],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    semi: ['error', 'never'],
    'sort-imports': 'warn',
    'sort-keys': 'warn',
    'sort-vars': 'warn'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
