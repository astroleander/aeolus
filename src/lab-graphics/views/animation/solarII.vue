
<template>
  <article ref="universe" class="desk">
    <planet 
      :coordinate="getSun" 
      :color="'#F00'"
    ></planet>
    <planet 
      v-for="(planet, idx) in planetList" :key="idx"
      :coordinate="coordinate(planet.x, planet.y, planet.r)" :color="planet.color">
    </planet>
    <div @click="i_say_let_there_be_a_planet()" class="floating-button" id="add-button">
      <p class="cross">+</p>
    </div>
    <div @click="i_say_let_there_be_dark()" class="floating-button" id="del-button">
      <p class="cross">-</p>
    </div>
  </article>
</template>

<script>
import Vue from 'vue'
import planet from '@v/view/components/planet'

export default {
  components: { planet },
  data() {
    return {
      sun: this.coordinate(),
      timerList: [],
      // for each plenet, 
      // planetList saves its
      /**
       * - x, - y, - radius*2 (d)
       * - current deg(deg)
       * - distance(r)
       */
      planetList: [],
    }
  },
  computed: {
    getSun() {
      return {
        x: this.sun.x - this.sun.r + 'px',
        y: this.sun.y - this.sun.r + 'px',
        d: this.sun.r * 2 + 'px'
      }
    }
  },
  methods: {
    i_say_let_there_be_dark() {
      let idx = Math.random() * (this.planetList.length - 1) - 0.5
      this.planetList.splice(idx, 1)
    },
    i_say_let_there_be_a_planet() {
      this.createPlanet(50 + Math.random() * 400, Math.random() * 50)
    },
    getColor(rgb) {
      return rgb === undefined ? (() => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      })() : rgb 
    },
    coordinate(x=0, y=0, r=1) {
      return {
        x: x + 'px', 
        y: y + 'px',
        d: r * 2 + 'px'
      }
    },
    /**
     * @param {Number} distance - distance of eart
     * @param {Number} radius radius of planet
     */
    createPlanet(distance, radius=20) {
      this.planetList.push({
        color: this.getColor(undefined),
        r: radius,
        d: distance,
        deg: 0,
        x: 0,
        y: 0,
      })
      console.log(this.planetList)
    },
    draw(parent) {
      let vm = this
      this.timerList.push(setInterval(() => {
        vm.planetList.forEach((planet, idx, list) => {
          Object.assign(planet, vm.getCanvasCoordinate(planet.r, planet.d, planet.deg || 0, parent))
          list.splice(idx, 1, planet)
        })
      }, 1))
    },
    getCanvasCoordinate(radius, distance, angle, parent) {
      function deg(angle) {
        return angle * (Math.PI / 180)
      }
      /**
       * - stallris:
       *    // if x,y are artrual coordinate central
       *    [ parent.x + r * cos(deg) - stallris.r , 
       *      parent.y + r * sin*deg) - stallris.r ] 
       */ 
      let x = parent.x + distance * Math.cos(deg(angle)) - radius
      let y = parent.y + distance * Math.sin(deg(angle)) - radius
      // let deg = 
      return {
        x: x,
        y: y,
        deg: (angle + 0.5) % 360,
      }
    },
  },
  mounted() {
    const r = 50
    this.sun.x = window.innerWidth / 2
    this.sun.y = window.innerHeight / 2
    this.sun.r = r

    this.createPlanet(150, 10)

    this.draw(this.sun)
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

#add-button {
  position: fixed;
  left: 20px;
  bottom: 20px;
}

#del-button {
  position: fixed;
  left: 95px;
  bottom: 20px;
}
</style>
