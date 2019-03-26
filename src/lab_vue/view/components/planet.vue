<template>
  <div
    :style="this.styles"
    class="planet">
  </div>
</template>

<script>
export default {
  props: {
    coordinate: {
      type: Object,
      default: function() {
        return {
          x: 50,
          y: 50,
          d: 50,
        }
      }
    },
    color: {
      type: String,
      default: 'red'
    }
  },
  computed: {
    styles() {
      const vm = this
      // console.log(vm)
      // console.log(vm.coordinate)
      // console.log(vm.color)
      return {
        background: vm.color,
        width: vm.coordinate.d || '20px',
        height: vm.coordinate.d || '20px',
        top: vm.coordinate.y || '50%',
        left: vm.coordinate.x || '50%',
      }
    }
  },
  mounted() {
    // console.log(this.coordinate)
    // console.log(this.getCoordinate)
  }
}
</script>

<style lang="scss" scoped>
.planet {
  border-radius: 50%;
  position: fixed;
}
</style>
