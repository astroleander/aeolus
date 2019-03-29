/**
 * 被废弃，使用了 webpack-merge 来编写这个项目
 * @see https://webpack.js.org/guides/production/
 *  project
 * - |- webpack.config.js
 * + |- webpack.common.js
 * + |- webpack.dev.js
 * + |- webpack.prod.js
 * 
 * 
 */

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtactPlugin = require('mini-css-extract-plugin');
/**
 * node 风格的模块指令
 * node 在执行一个文件时给这个文件生成 exports 和 module 对象
 * exports = module.exports = {}; module.exports 和 exports 指向同一个空对象内存区域  
 *
 */
module.exports = {
  entry: {
    home: './index.js'
  },
  module: {
    rules: [
      /**
       * 如果想要使用 babel 的话, 它看起来是这样的:
      *  
      */
      // {
      //   text: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "babel-loader"
      //   }
      // }
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: { minimize: false }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtactPlugin.loader, 'css-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtactPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
}