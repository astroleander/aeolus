const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtactPlugin = require('mini-css-extract-plugin');

const { VueLoaderPlugin } = require('vue-loader')

/**
 * with webpack-merge
 * @see https://webpack.js.org/guides/production/
 * 
 */
module.exports = {
  // context: path.resolve(__dirname, '../'),
  entry: {
    home: './src/index.js',
    react: './src/lab_react/app.js',
    vue: './src/lab_vue/app.js',
    alive: './src/alive/main.js'
  },
  output: {
    chunkFilename: '[id].[hash].js',
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.json', '.vue', '.jsx'],
    /**
     * will NOT updated util re-compile
     */
    alias: {
      '@': path.join(__dirname, '..', 'src'),
      '@lv': path.join(__dirname, '..', 'src', 'lab_vue'),
      '@lr': path.join(__dirname, '..', 'src', 'lab_react'),
    },
    /**
     * @params Tell webpack what directories should be searched when resolving modules. 
     * @see https://webpack.js.org/configuration/resolve/#resolve-modules
     * if you change configuration path, you must set modules
     */
     modules: [path.resolve(__dirname, '../src'), '../node_modules']
  },
  module: {
    rules: [
      { 
        test: /\.jsx?$/,         // Match both .js and .jsx files
        // test: /\.jsx$/,         // Match .jsx files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", 
          options:{
            "presets": ["@babel/preset-env", "@babel/preset-react"]
          }
        } 
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
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
        test: /\.s[a|c]ss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          },
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {}
        }]
      }
    ]
  },
  plugins: [
    /**
     * 下次再尝试自动化配置, 这次不破坏 webpack 的默认结构
     */
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      chunks: ['home']
    }),
    new HtmlWebPackPlugin({
      template: './src/lab_react/index.html',
      filename: './lab_react/index.html',
      chunks: ['react']
    }),
    new HtmlWebPackPlugin({
      template: './src/lab_vue/index.html',
      filename: './lab_vue/index.html',
      chunks: ['vue']
    }),
    new HtmlWebPackPlugin({
      template: './src/alive/index.html',
      filename: './alive/index.html',
      chunks: ['alive']  
    }),
    new MiniCssExtactPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new VueLoaderPlugin()
  ],
  output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, '../dist')
  }
}