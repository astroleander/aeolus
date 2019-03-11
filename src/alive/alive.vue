<template>
  <article :class='"alive-calendar big-picture-bk"' :style='getBackground'>
    <section>
      <h1>{{title}}</h1>
      <!-- <a href="../lab_react/index.html">React Lab</a> -->
      <!-- <a href="../index.html">Home</a> -->
      <!-- <router-view/> -->
    </section>
  </article>
</template>

<script>
import background from './assets/pictures'

export default {
  name: 'Alive',
  data() {
    return {
      pics: require('./assets/pictures/index.js'),
      title: 'Vue Lab'
    }
  },
  computed: {
    getBackground: function() {    
      return "background-image: url(" + background + ");"
    }
  },
}
</script>

<style scoped>
</style>

<style lang="scss" scoped>
.alive-calendar {
  margin: 0px 0px 0px 0px;
  padding: 4px;
  width: 100%;
  height: 100%;
}

.big-picture-bk {
  min-height: 100vh;
  position: relative;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>