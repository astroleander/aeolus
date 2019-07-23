const config = {
  home: {
    entry: './src/index.js',
    htmlwebpackplugin: {
      template: './src/index.html',
      filename: './index',
      chunks: ['home']
    }
  },
  react: {
    entry: './src/lab-react/app.js',
    htmlwebpackplugin: {
      template: './src/lab-react/index.html',
      filename: './lab-react/index',
      chunks: ['react']
    }
  },
  vue: {
    entry: './src/lab-vue/app.js',
    htmlwebpackplugin: {
      template: './src/lab-vue/index.html',
      filename: './lab-vue/index',
      chunks: ['vue']
    }
  },
  graphics: {
    entry: './src/lab-graphics/app.js',
    htmlwebpackplugin: {
      template: './src/lab-graphics/index.html',
      filename: './lab-graphics/index',
      chunks: ['graphics']
    }
  },
  js: {
    entry: './src/lab-js/app.js',
    htmlwebpackplugin: {
      template: './src/lab-js/index.html',
      filename: './lab-js/index',
      chunks: ['js']
    }
  }
}

module.exports = {
  htmlWebPackPlugins: () => {
    return Object.entries(config).map(item => {
      return item[1].htmlwebpackplugin
    })
  },
  entries: () => {
    let obj = {}    
    Object.entries(config).map(item => {
      obj[item[0]] = item[1].entry
    })
    return obj
  },
  path: () => {
    return Object.entries(config).map(item => {
      return [ 
        item[0],
        item[1].htmlwebpackplugin.filename.replace('.', '')
      ]
    })
  }
} 