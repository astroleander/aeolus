const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
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