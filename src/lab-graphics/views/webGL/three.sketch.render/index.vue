<template>
  <article class="fullscreen">
    <div id="container">
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
    container.style.height = window.innerHeight + 'px';
    console.log(container,container.style.height)
    this.manager = new SceneManager(container)
    this.render();
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
</style>