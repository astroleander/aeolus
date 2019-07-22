const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtactPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { VueLoaderPlugin } = require('vue-loader')

/**
 * NOT update until re-compile
 * with webpack-merge
 * @see https://webpack.js.org/guides/production/
 * 
 */
module.exports = {
  /**
   * 指定了加载的路径
   */
  context: path.resolve(__dirname, '..'),
  /**
   * @TODO 动态入口加载
   * 这里设定的就是一坨一坨的 chunk 了
   */
  entry: {
    home: './src/index.js',
    build: ['./src/lab-build/entrance.js', './src/lab-build/entrance.1.js'],
    build2: ['./src/lab-build/entrance.2.js'],
    react: './src/lab-react/app.js',
    vue: './src/lab-vue/app.js',
    graphics: './src/lab-graphics/app.js'
  },
  /**
   * @property {path:String} filename entry 里定义的入口文件的输出 bundle 的名称。
   *           注意，在这种 entry 为多个入口的形式的项目中,
   *           应使用占位符设置 filename 为可变的值，
   *           否则这个生产的 filename 文件会被覆盖。
   *           占位符包括
   *           - @option [name] 会被 chunk 的名字替代
   *           - @option [hash] 会被本次编译的 hash 值代替
   *           - @option [hashname] 会被 chunk 的 hash 值代替
   * @property {path:String} path 输出目录
   * @property {url:String} publicPath 线上公开地址, 此选项指定在浏览器中所引用的「此输出目录对应的公开 URL」。
   *           对于按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）来说，output.publicPath 是很重要的选项。
   *           @see https://www.webpackjs.com/configuration/output/#output-publicpath
   * output 属性还有更多可配置的特性，如果你想要了解更多关于 output 属性的概念，你可以通过阅读概念章节 @see https://www.webpackjs.com/configuration/output/ 来了解更多。
   */
  output: {
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[id].[hash].js',
    path: path.resolve(__dirname, '../dist'),
    pathinfo: true
  },
  /**
   * 这些选项能设置模块如何被解析。webpack 提供合理的默认值，但是还是可能会修改一些解析的细节。
   * 关于 resolver 具体如何工作的更多解释说明，请查看模块解析。 
   * @see https://www.webpackjs.com/concepts/module-resolution
   * 
   * @property {rulelist:Object} alias
   *           简写，用于替代相对路径。
   *           $ 表示精准匹配
   * @property {:Array} modules 告诉 webpack 解析模块时应该搜索的目录。
   * @property {:Array} extensions 自动解析确定的扩展。
   *           拥有两个默认值, js 和 json, 使用此选项，会覆盖默认数组
   * @FIXME extensions 可能有一个潜在的 bug, 我并没有去包含一个含 "*" 的数组
   * 
   * 此外还有一坨比较重要但是默认值已经够用了的
   * @property {:Array} descriptionFiles 用于描述的 JSON 文件 
   * default value: `descriptionFiles: ["package.json"]`
   * @property {:boolean} enforceExtension 如果是 true，将不允许无扩展名(extension-less)文件。
   * default value: `enforceExtension: false`
   * @property {:Array} mainFields 当从 npm 包中导入模块时，此选项将决定在 package.json 中使用哪个字段导入模块。
   * （例如，import * as D3 from "d3"）
   * default value: `mainFields: ["module", "main", ...]`
   * 根据 webpack 配置中指定的 target 不同，默认值也会有所不同。
   * @property {:Array} mainFiles 解析目录时要使用的文件名
   * default value: `mainFiles: ["index"]`
   * 
   */
  resolve: {
    extensions: ['.js', '.json', '.vue', '.jsx'], 
    alias: {
      '@': path.join(__dirname, '..', 'src'),
      '@v': path.join(__dirname, '..', 'src', 'lab-vue'),
      '@r': path.join(__dirname, '..', 'src', 'lab-react'),
      '@g': path.join(__dirname, '..', 'src', 'lab-graphics'),
      '@b': path.join(__dirname, '..', 'src', 'lab-build'),
      '#res': path.join(__dirname, '..', 'src', 'res'),
      '#algo': path.join(__dirname, '..', 'src', 'modules', 'algo'),
    },
    /**
     * @property Tell webpack which directories should be searched when resolving modules. 
     * @see https://webpack.js.org/configuration/resolve/#resolve-modules
     * once you change configuration path, you must set modules like that
     */
     modules: [path.resolve(__dirname, '../src'), '../node_modules']
  },
  /**
   * @property {Array} module.rules 这些规则 (Rule) 选项决定了如何处理项目中的不同类型的模块。
   * @see https://www.webpackjs.com/configuration/module/
   * 每个规则分为三个部分
   * 1. 条件 根据 resolve 规则解析过后的绝对路径，或者是被请求资源的模块文件导入时的绝对路径。
   * 在规则中，属性 test, include, exclude 和 resource 对 resource 匹配，并且属性 issuer 对 issuer 匹配。
   * 当使用多个条件时，所有条件都匹配。
   * 2. 结果
   * 规则结果只在规则条件匹配时使用。
   * 规则有两种输入值：
   *  2.1. 应用的 loader：应用在 resource 上的 loader 数组。
   *  2.2. Parser 选项：用于为模块创建解析器的选项对象。
   * 这些属性会影响 loader：loader, options, use。
   * 3. 嵌套规则
   * 可以使用属性 rules 和 oneOf 指定嵌套规则。
   * 这些规则用于在规则条件(rule condition)匹配时进行取值。
   */
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
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {}
        }]
      },
      // vue-svg-loader 会对 svg 进行压缩和优化，并不适用于对 svg 要进行深度操作的场合
      {
        test: /\.icon\.svg$/,
        loader: 'vue-svg-loader'
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  /**
   * plugins 选项用于以各种方式自定义 webpack 构建过程。webpack 附带了各种内置插件，可以通过 webpack.[plugin-name] 访问这些插件。
   */
  plugins: [
    /**
     * 关于 HtmlWebPackPlugin 的简略使用操作请看最后对 lab-build 模块进行配置的说明
     */
    new HtmlWebPackPlugin({
      template: './src/index.html', 
      filename: './index.html',     // 
      chunks: ['home']
    }),
    new HtmlWebPackPlugin({
      template: './src/lab-react/index.html',
      filename: './lab-react/index.html',
      chunks: ['react']
    }),
    new HtmlWebPackPlugin({
      template: './src/lab-vue/index.html',
      filename: './lab-vue/index.html',
      chunks: ['vue']
    }),
    new HtmlWebPackPlugin({
      template: './src/lab-graphics/index.html',
      filename: './lab-graphics/index.html',
      chunks: ['graphics']
    }),

    /**
     * @param arugments[0] {
     *    @property {String} template 作为模板的 html 文件
     *    @property {String} filename 要导出到的 html 文件, 注意如果要硬編碼的话这个地址才是硬编码指向的地址
     *    @property {Array} chunks 对应的入口文件
     *    @property {boolean} hash 哈不哈
     * }
     */
    new HtmlWebPackPlugin({
      template: './src/lab-build/template.html',
      filename: './lab-build/output.html', 
      chunks: ['build'],
      hash: true,
      minify: {
        collapseInlineTagWhitespace: true
      },
      excludeChunks: ['home', 'react', 'vue', 'graphics']
    }),

    /**
     * zh: 其他插件
     * en: other plugins
     */
    new MiniCssExtactPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
    new VueLoaderPlugin(),
    new BundleAnalyzerPlugin({
      analyzerPort: 1989,
    })
  ]
}