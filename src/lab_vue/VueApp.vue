<template>
  <transition mode="out-in">
    <router-view/>
  </transition>
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

.v-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.v-enter-active, 
.v-leave-active {
  transition: all .5s;
}

#vue-app {
  width: 100%;
}
</style>