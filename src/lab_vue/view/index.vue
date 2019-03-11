<template>
  <div>
    <p>Filter: <input type="text" v-focus v-model="list_filter"/><del>(not supported to search tag)</del>support!</p>
    <li v-for="(view, idx) in view_filter_list" :key="idx">
      <router-link v-if="view.meta.paths.length === 1" :to="{ path: view.path, name: view.name }">
        {{ view.meta ? view.meta.name || view.name : view.name }}
      </router-link>
      <router-link v-else :to="{ path: view.path, name: view.name }">
        <template v-for="(path, idx) in view.meta.paths">
            {{idx === view.meta.paths.length - 1 ? view.meta.name : '[' + path + ']'}}
        </template>
      </router-link>
      
    </li>
  </div>
</template>

<script>
import view_routes from '@lv/router/view'

export default {
  data: function() {
    return {
      list_filter: "",
      view_list: []
    }
  },
  computed: {
    view_filter_list: function() {
      return this.view_list.filter(view => view.name.search(this.list_filter)+1)
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    },
  },
  created: function() {

  },
  mounted: function() {
    // import('../router').then(module => {
    //   this.view_list = module.view_routes
    // })
    import('../router/view').then(module => {
      console.log(module)
      this.view_list = module.default
    })
  }
}
</script>

<style>

</style>
