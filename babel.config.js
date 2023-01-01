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
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@assets': './assets',
            '@components': './src/components/index',
            '@constants': './src/constants',
            '@hooks': './src/hooks',
            '@modules': './src/modules',
            '@redux': './src/redux',
            '@custom-types': './src/types'
          }
        }
      ]
    ]
  }
}
