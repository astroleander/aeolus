const view_routes = []
console.log('[Call][File] view.js')

function importViews (r) {
  r.keys().forEach(key => {
    const { route, name, paths } = (function(key) {
      const route = key.split('.')[1]
      const paths = route.replace(/_/g, ' ').split('/').splice(1)
      const name = paths[paths.length-1].replace(/_/g,' ').replace(/-/,' - ')
      return { route, name, paths }
    }) (key)
    view_routes.push({
      // full name
      route: route,
      path: name,
      // last name
      name: paths.map(
          (e, idx) => idx !== paths.length - 1 ?
          `[${e}]` : e 
        ).join('').replace(/\//, "").replace(/{\/|_}/g, " "),
      component: () => r(key)
    });
  });
}

importViews(require.context('@r/views', true, /\.jsx$/, 'lazy'))

console.log(view_routes)
export default view_routes