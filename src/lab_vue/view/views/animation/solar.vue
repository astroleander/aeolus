<template>
  <article ref="universe" class="desk">
    <planet :coordinate="getSun" :color="'#666'"></planet>
    <planet :coordinate="posList" :color="'#333'"></planet>
  </article>
</template>

<script>
import Vue from 'vue'
import planet from '@lv/view/components/planet'

const coordinate = (x, y, r) => {
  return {
    x, y, d: r*2
  }
}

export default {
  components: { planet },
  data() {
    return {
      sun: coordinate(),
      earth: coordinate(),
      timerList: [],
      earth_deg: 0,
      posList: {}
    }
  },
  computed: {
    getSun() {
      return {
        x: this.sun.x - this.sun.r + 'px',
        y: this.sun.y - this.sun.r + 'px',
        d: this.sun.r*2 + 'px'
      }
    }
  },
  methods: {
    draw(stallris, parent, r, deg) {
      // let ret = this.getCanvasCoordinate(stallris, parent, r, deg)
      let vm = this
      this.timerList.push(setInterval(() => {
        vm.earth_deg += 1
        const newret = vm.getCanvasCoordinate(stallris, parent, r, (vm.earth_deg + 10) % 360)
        vm.posList = newret 
      }, 10))
      
    },
    getCanvasCoordinate(stallris, parent, r, angle) {
      function deg(angle) {
        return angle * (Math.PI / 180)
      }
      /**
       * actrual coordinate:
       * - parent:
       *    [ parent.x, parent.y ] ( circle center )
       * - stallris:
       *    [ parent.x + r * cos(deg), parent.y + r * sin(deg) ]
       * 
       * canvas coordinate:
       * - parent:
       *    [ parent.x - parent.r , parent.y - parent.r ]
       * - stallris:
       *    // if x,y are artrual coordinate central
       *    [ parent.x + r * cos(deg) - stallris.r , 
       *      parent.y + r * sin*deg) - stallris.r ] 
       *    // if x,y are canvas coordinate central
       *    [ parent.x + r * cos(deg) + parent.r - stallris.r , 
       *      parent.y + r * sin*deg) + parent.r - stallris.r ] 
       */
      let x = parent.x + r * Math.cos(deg(angle)) - stallris.r
      let y = parent.y + r * Math.sin(deg(angle)) - stallris.r
      console.log(x, y, stallris.r)
      return {
        x: x + 'px',
        y: y + 'px',
        d: stallris.r * 2 + 'px'
      }
    },
  },
  mounted() {
    const r = 50
    this.sun.x = window.innerWidth/2
    this.sun.y = window.innerHeight/2
    this.sun.r = r

    const distance = 300
    
    this.earth.r = 50
    this.draw(this.earth, this.sun, 300, 90)
  },
  destroyed() {
    this.timerList.forEach(timer => {
      clearInterval(timer)
    });
  }
}
</script>

<style lang="scss" scoped>
.planet {
  color: rgb(104, 98, 98);
}

.desk {
  width: 100vw;
  height: 100vh;
}
</style>
