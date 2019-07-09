<template>
  <article v-life-cycle:article class="flex-container column">
    <keep-alive>
      <component v-life-cycle:component v-bind:is="getCard" placeholder="If im input">Test</component>
    </keep-alive>

    <!-- <component v-life-cycle:component v-bind:is="getCard" placeholder="If im input">Test</component> -->
    <p>相较于非keep-alive的版本，似乎区别只有在更新组件时 article 本身更新的时机?（触发article:componentUpdated的时刻不同）</p>
    <button @click="changeButton">Change component</button>
  </article>
</template>

<script>
import AeoCard from '@v/view/components/common/Card'
import CustomInput from '@v/view/components/sample/CustomInput'

export default {
  components: {
    AeoCard, CustomInput
  },
  data() {
    return {
      val: false,
      choices: ['aeo-card', 'custom-input']
    }
  },
  methods: {
    changeButton() {
      this.val = !this.val
    }
  },
  computed: {
    getCard() {
      if(this.val)
        return this.choices[0]
      else
        return this.choices[1]
    }
  },
  directives: {
    'life-cycle': {
      bind: function(el, binding, vnode) {
        console.log('[v-bind]' + binding.arg)
      },
      inserted: function(el, binding, vnode) {
        console.log('[v-inserted]' + binding.arg)
      },
      updated: function(el, binding, vnode) {
        console.log('[v-updated]' + binding.arg)
      },
      componentUpdated: function(el, binding, vnode) {
        console.log('[v-componentUpdated]' + binding.arg)
      },
      unbind: function(el, binding, vnode) {
        console.log('[v-unbind]' + binding.arg)
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
