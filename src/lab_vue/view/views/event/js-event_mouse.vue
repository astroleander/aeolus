<template>
  <article>
    <div class="dashboard">
      <p>{{screen_coordinate}}</p>
      <p>{{client_coordinate}}</p>
      <div v-bind:style="style" 
      class="point"></div>
    </div>
  </article>
</template>

<script>
export default {
  data: function() {
    return {
      screen_coordinate: {
        x: 0,
        y: 0
      },
      client_coordinate: {
        x: 0,
        y: 0
      },
      left: 0,
      top: 0
    }
  },
  watch: {
  },
  computed: {
    style() {
      const width = 50 * this.left / this.top;
      const height = 50 * this.left / this.top;
      return {
        left: this.left - width / 2 + 'px',
        top: this.top - height / 2 + 'px',
        width: width + 'px',
        height: height + 'px'
      }
    }
  },
  created: function() {
  },
  mounted: function() {
    document.addEventListener('mousemove', event => {
      this.screen_coordinate.x = event.screenX
      this.client_coordinate.x = event.clientX
      this.screen_coordinate.y = event.screenY
      this.client_coordinate.y = event.clientY

      this.left = event.clientX
      this.top = event.clientY
      console.log(this.style)
    }, false)
  },
}
</script>

<style lang="scss" scoped>
.point {
  position: fixed;
  background: #FE4600;
  border-radius: 50%;
}
</style>
