<template>
  <article v-life-cycle class="flex-middle">
    {{text}}
    <button @click="changeButton">change the text</button>
  </article>
</template>

<script>
export default {
  data() {
    return {
      text: 'text here'
    }
  },
  methods: {
    changeButton() {
      this.text = ''
      for (let i = 1; i < 10; i++)
        this.text += (String.fromCharCode(65 + Math.floor(Math.random() * 26))) 
    }
  },
  directives: {
    'life-cycle': {
      bind: function(el, binding, vnode) {
        console.log('[v-bind] article ')
      },
      inserted: function(el, binding, vnode) {
        console.log('[v-inserted] article ')
      },
      updated: function(el, binding, vnode) {
        console.log('[v-updated] article ')
      },
      componentUpdated: function(el, binding, vnode) {
        console.log('[v-componentUpdated] article ')
      },
      unbind: function(el, binding, vnode) {
        console.log('[v-unbind] article ')
      },
    }
  },
  beforeCreate() {
    console.log('Init Events & Lifecycle')
    console.log('[beforeCreate]: Init injections & reactivity')
  },
  created() {
    console.log('[created]')
    console.log('not found [#el], render template')
  },
  beforeMount() {
    console.log('el:',this.$el)
    console.log('[beforeMount]: create vm.$el and replace "el" with it')
  },
  mounted() {
    console.log('el:',this.$el)
    console.log('[mounted]')
  },
  beforeUpdate() {
    console.log('[beforeUpdate]: when data changes')
    console.log(this.$data)
  },
  updated() {
    console.log('[updated]: after data changes')
    console.log(this.$data)
  },
  beforeDestroy() {
    console.log('[beforeDestroy]: when vm.$destroy() is called')
    console.log('Teardown watchers.child components and event listeners')
  },
  destroyed() {
    console.log('[destroyed]')
  }
}
</script>

<style>

</style>
