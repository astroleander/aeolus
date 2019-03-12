const view_routes = []

function importViews (r) {
  r.keys().forEach(key => {
    const { route, name, paths } = (function(key) {
      const route = key.split('.')[1]
      const paths = route.split('/').splice(1)
      const name = paths[paths.length-1].replace(/_/g,' ').replace(/-/,' - ')
      return { route, name, paths }
    }) (key)
    view_routes.push({ 
      path: route,
      // full name 
      name: route.replace(/\//,'').replace(/{\/|_}/g, ' '),
      // last name
      meta: { name, paths },
      component: () => r(key)
    })
  });
}

importViews(require.context('@lv/view/views', true, /\.vue$/, 'lazy'))

console.log(view_routes)
export default view_routes