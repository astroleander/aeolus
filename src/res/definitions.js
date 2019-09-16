module.exports = {
  flask: {
    path: 'http://localhost',
    port: 5000,
    url: function(url) {
      return this.path +':'+ this.port + '/' + (url || '')
    }
  },
  django: {
    path: 'http://localhost',
    port: 8000,
    url: function(url) {
      return this.path + ':' + this.port + '/' + (url || '')
    }
  },
  entries: [
    { title: 'Build',     path: '/lab-build/output.html' },
    { title: 'Graphics',  path: '/lab-graphics/index.html' },
    { title: 'Vue',       path: '/lab-vue/index.html' },
    { title: 'React',     path: '/lab-react/index.html' },
    { title: 'JS',        path: '/lab-js/index.html' }
  ]
}