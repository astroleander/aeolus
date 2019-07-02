<template>  
  <div class="container" ref="container"
      @mousedown="moveClear"
      @mouseleave="moveClear"
      @mouseup="moveEnd">
    <div
      :style='{
        width: this.getWidth
        }'
      class="value"
      >
      <div class="drag" 
        @mousedown.stop="moveStart" 
        ></div>
    </div>
    <div
    :style='{
      color: this.getColor
      }' 
      class="hint">
      {{ this.value.value }} / {{ this.value.total }}
      </div>
    <div id="shown">

    </div>
  </div>
</template>

<script>
export default {
  /**
   * value
   *   |- values
   *   |- 
   *   |- total
   */
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          value: 80,
          total: 100,
        }
      }
    }
  },
  data() {
    return {
      width: '10px',
      dragging: false,
      length: 0,
      color: this.getColor
    }
  },
  computed: {
    getWidth() {
      return this.width + 'px'
    },
    calWidth() {
      const precent = this.value.value/this.value.total
      const width = this.$refs.container.clientWidth
      if(precent > 1) return width
      return precent * width
    },
    getColor() {
      const precent = this.value.value/this.value.total
       
      if (precent > 1) {
        return '#ffca28'
      }
      else if(precent > 0.6) {
        return '#FFF'
      }
      return '#000'
    }
  },
  methods: {
    move(e) {
      console.log(e)
    },
    moveStart(e) {
      e.preventDefault()
      this.dragging = true
      this.length = e.pageX
    },
    moveEnd(e) {
      if (this.dragging) {
        e.preventDefault()
        this.length = e.pageX - this.length
        console.log(this.length)
        this.dragging = false
        this.dealDrag(this.length)
      }
    },
    moveClear(e) {
      e.preventDefault()
      console.log('clear')
      this.dragging = false
    },
    dealDrag(length) {
      // console.log(this.$refs.container.clientWidth)
      const unit = this.$refs.container.clientWidth
      const total = this.value.total

      this.width = this.width + length

      let newValue = total * this.width / unit
      newValue = newValue < 0 ? 0 : newValue
      newValue = newValue > total ? total : newValue
      this.$emit('input', {
        total: this.value.total,
        value: Math.floor(newValue)
      })
    }
  },
  mounted() {
    this.width = this.calWidth
  },
  watch: {
    value: {
      deep: true,
      handler(value) {
      console.log('changed')
        this.width = this.calWidth
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 30px;
.container {
  min-width: 400px;
  display: block;
  position: relative;
  border-radius: $height/2;
  margin: 8px;
  background: #DDD4;
  height: $height;
  z-index: 0;
}

.value {
  border-radius: $height/2;
  height: $height;
  z-index: 999;
  background: 
    repeating-linear-gradient(135deg, 
            #43a047 0, #43a047 15px,
            #8bc34a 15px, #8bc34a 30px,
            );
  transition: width 1s ease;
}

.drag {
  cursor: w-resize;
  float: right;
  height: 100%;
  width: 10px;
  // clear: both;
  margin-right: -5px;
  background: transparent;
  z-index: 999;
  }

.hint {
  pointer-events: none;
  height: 100%;
  position: absolute;
  margin-top: -$height;
  width: 100%; 
  font-weight: bold;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

  line-height: $height;
  text-align: center;
  transition: opacity 1s, color 1s;
  z-index: 998;
}
</style>


<style>

</style>
