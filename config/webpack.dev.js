const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  /**
   * 这个值会被打在 process.env.NODE_ENV 上, 顾名思义, 这个值实际不是 webpack 提供的, 而是 Node 提供的,
   * 在打包时这个值被编译成变量
   */
  mode: 'development',
//   devtool: 'inline-source-map',
  devServer: {
    port: 21452,
    proxy: {
      '/api/v1/bing' : {
        target: 'http://www.bing.com/',
        pathRewrite: { 
          '^/api/v1/bing' : '',
         },
        changeOrigin: true,
        secure: false
      },
      '/api/v1/ecb' : {
        target: 'https://www.ecb.europa.eu/',
        pathRewrite: { 
          '^/api/v1/ecb' : '',
         },
        changeOrigin: true,
        secure: false
      }
    }
  }
});