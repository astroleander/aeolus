<template>
  <article class="banner-board background background-pic-1">
    <transition name="fade">
      <!-- 1, 2, 3 -->
      <div :class="['title']" v-if="turn > 0">{{line1}}</div>
    </transition>
    <transition name="fade">
      <!-- 0, 1, 2 -->
      <div :class="['title']" v-if="turn !== 2">{{line2}}</div>
    </transition>
  </article>
</template>

<script>
export default {
  computed: {
    getText: function() {
      do {
        const idx = Math.floor(Math.random() * this.poem.length);
      } while (this.poem[idx] !== this.line1 && this.poem[idx] !== this.line2) 
      return this.poem[idx]
    }
  },
  data: function() {
    return {
      turn: 0,
      timer: null,
      line1: this.getText,
      line2: this.getText,
      poem: [
        "FISHMAN - HJL",
        "Outpost of gymnopedie #1",
        "Life is Hard",
        "CSS BANNER - TESTING",
        "JIA HONG WEI SHI RUO ZHI"
      ]
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      if (this.turn === 0) {
        this.line1 = (() => {
          const idx = Math.floor(Math.random() * this.poem.length);  
          return this.poem[idx]
        })()
      } else if (this.turn === 2) {
        this.line2 = (() => {
          const idx = Math.floor(Math.random() * this.poem.length);  
          return this.poem[idx]
        })()
      }
      console.log(this.turn)
      this.turn === 3 ? this.turn = 0 : this.turn++
    }, 2000)
  },
  destroyed() {
    clearInterval(this.timer) 
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Libre+Barcode+128+Text');

.banner-board {
  min-height: 100vh;

  display: block;
}

.title {
  position: fixed;
  left: 0;
  right: 0;
  margin: auto;

  text-align: center;
  line-height: 100vh;

  font-size: 8em;
  font-family: 'Libre Barcode 128 Text', cursive;
  transition: all 1s;
}

.background {
  opacity: 0.65;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &.background-pic-1 {
    background-image: url('../../../assets/p_parallax_1.jpg')
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 2s ease-in-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
