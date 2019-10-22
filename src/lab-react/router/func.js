const path = require('path')
let function_list = []
function importAll(r) {
  r.keys().forEach(key => {
    function_list.push({
       key, 
       r,
       path: path.join('algo', key)
    })
  })
}
importAll(require.context('@/modules/algo', true, /.js$/, 'lazy'))
console.log(function_list)
export default function_list