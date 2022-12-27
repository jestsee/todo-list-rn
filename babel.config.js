/* eslint-disable sort-keys */
module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      //if you already have other plugin just paste this lines below
      [
        'module-resolver',
        {
          // root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@components': './src/components/index',
            '@constants': './src/constants',
            '@hooks': './src/hooks',
            '@modules': './src/modules',
            '@custom-types': './src/types'
          }
        }
      ]
    ]
  }
}
