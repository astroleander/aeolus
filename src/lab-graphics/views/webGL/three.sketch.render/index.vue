<template>
  <article class="fullscreen">
    <div id="container" class="fullscreen">
    </div>
  </article>
</template>

<script>
import SceneManager from './scene_manager'
export default {
  data() { return {
    manager: null
  } },
  mounted() {
    let container = document.getElementById('container');
    this.manager = new SceneManager(container)
    this.render()
  },
  methods: {
    render() {
      requestAnimationFrame(this.render);
      this.manager.render();
    }
  }
}
</script>

<style scoped lang='scss'>
#container {
  overflow: hidden;
}
</style>
<style>
canvas { 
     height: 100%; 
     width: 100%; 
     display: block;
     /* background: #222; */
    } 
 
</style>