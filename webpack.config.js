const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const DEV = true;

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  mode: DEV ? 'development' : 'production',
  devtool: DEV ? 'source-map' : undefined,
  
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    inline:true,
    port: 8080
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/template.html'})
  ]
};