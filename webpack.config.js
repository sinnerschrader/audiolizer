const path = require('path')

module.exports = {
  entry: {
    app: './app/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
        exclude: /(node_modules)/
      }
    ]
  },
  plugins: [],
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    compress: true,
    historyApiFallback: true,
    hot: false
  }
}
