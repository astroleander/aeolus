<template>
  <router-view/>
</template>

<script>
export default {
  name: 'VueApp',
  data() {
    return {
      title: 'Hello Vue!'
    }
  },
  created() {
  }
}
</script>

<style scoped>
</style>

<style lang="scss" scoped>
html {
  background: repeating-linear-gradient(45deg, #FC5500 0, #FC5500 30px, transparent 30px, transparent 60px);
}
</style>