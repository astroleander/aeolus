const view_routes = []

function importViews (r) {
  r.keys().forEach(key => {
    const { route, name, paths } = (function(key) {
      const route = key.split('.').slice(1, -1).join('.')
      const paths = route.replace(/_/g, ' ').split('/').splice(1)
      const name = paths[paths.length-1].replace(/_/g,' ').replace(/-/,' - ')
      return { route, name, paths }
    }) (key)
    view_routes.push({
      // full name
      path: route,
      // last name
      name: route.replace(/\//, "").replace(/{\/|_}/g, " "),
      meta: { name, paths },
      component: () => r(key)
    });
  });
}

importViews(require.context('@g/views', true, /\.vue$/, 'lazy'))

console.log(view_routes)
export default view_routes