<template>
  <article>
    <form id="search">
      Search
      <input name="query" v-model="searchQuery"
        @keydown.enter="e => e.preventDefault()"
      />
    </form>
    <demo-grid
      :heroes="gridData"
      :columns="gridColumns"
      :filter-key="searchQuery"
      >
    </demo-grid>
  </article>
</template>

<script>
import DemoGrid from '@v/view/components/sample/DemoGrid'

export default {
  components: { DemoGrid },
  data: function() {
    return {
      searchQuery: '',
      gridColumns: ['name', 'power'],
      gridData: [
        { name: 'Chuck Norris', power: Infinity },
        { name: 'Bruce Lee', power: 9000 },
        { name: 'Jackie Chan', power: 7000 },
        { name: 'Jet Li', power: 8000 }
      ]
    }
  },
  watch: {
    searchQuery(v) {
      // console.log(v)
    }
  } 
}
</script>

<style>

</style>
