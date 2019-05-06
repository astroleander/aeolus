<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'Alive',
  data() {
    return {
      // pics: require('./assets/pictures/index.js'),
    }
  },
  computed: {
    
  },
  methods: {
    getBackground: function() {
      
    },
  },
  mounted() {
    this.getBackground()
  }
}
</script>

<style scoped>
</style>

<style lang="scss" scoped>

</style>