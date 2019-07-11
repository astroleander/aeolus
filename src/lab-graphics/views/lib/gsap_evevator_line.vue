<template>
  <article class="fullscreen">
    <svg class="fullscreen" id="lines" 
    xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" 
    xmlns="http://www.w3.org/2000/svg" xml:space="preserve" 
    preserveAspectRatio="none" 
    x="0px" y="0px" viewbox="0 0 1920 1080">
      <g class="lines">
        <path d="M0,0 V2080" id="pathtest"></path>
      </g>
      <g class="lights">
        <path d="M898,-120V-30H902V-120ZM898,0V30H902V0Z" stroke='red' stroke-width='4px'>
          <animateMotion dur="6s" repeatCount="indefinite">
            <mpath xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#pathtest"></mpath>
          </animateMotion>
        </path>
        <template v-for="(_, idx) in Array(150)">
          <rect :key="idx" 
          :width="~~(Math.random() * 10)" :height="~~(Math.random() * 500)" 
          :fill="randomColor(idx)" :transform='`translate(${~~(Math.random() * 1920)} -1000)`'>
            <animateMotion :dur="~~(1000 + Math.random() * 7000) + 'ms'" repeatCount="indefinite">
              <mpath xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#pathtest"></mpath>
            </animateMotion>
          </rect>
        </template>
      </g>
    </svg>
  </article>
</template>

<script>
import TweenLite from 'gsap/TweenLite'
import { setInterval } from 'timers';
function animateWithRandomNumber(className, from, to) {
  TweenLite.fromTo(
    className,
    ~~Math.floor((Math.random() * 2) + 1), 
    { 'stroke-width': from }, 
    { 'stroke-width': to,
      onComplete: animateWithRandomNumber,
      onCompleteParams: [className, from, to],
      ease: Linear.easeNone 
      }
  );
}
export default {
  mounted() {
    // let p = document.querySelector('.light')
    // console.log(p)
    // var length = p.getTotalLength()
    // console.log(length)
    // document.querySelectorAll('.light')
    // .forEach(className => animateWithRandomNumber(className, 0, 20))
    // const itemsDown = ["light4", "light5", "light6", "light7", "light8", "light11", "light12", "light13", "light14", "light15", "light16"]
    //   .forEach(className => animateWithRandomNumber(className, -1080, 1080))
    // const itemsUp = ["light1", "light2", "light3","light9", "light10", "light17"]
    //   .forEach(className => animateWithRandomNumber(className, 1080, -1080))
  },
  data() {
    return {
      color:['#FFC302', 'amber', 'green', 'indigo', '#45F813', 'blue', 'pink']
    }
  },
  methods: {
    randomColor (idx) {
      console.log(this.color[~~(Math.random() * 100) % this.color.length])
      return this.color[~~(Math.random() * 100) % this.color.length]
    }
  }
}
</script>

<style lang="scss" scoped>
.fullscreen {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  background: #222222;
}
svg{
  position: absolute;
  height: 100%;
}
.lines {
  opacity: 0.05; 
  stroke-width: 4px;
  stroke: red;
}
.line {
  fill-rule: evenodd;
  clip-rule: evenodd;
  fill: #4C3A90; 
}

.lights {
  opacity: 0.9;
  fill: red;
}

.light {
  fill-rule: evenodd;
  clip-rule: evenodd;
  fill: #7A6BB5; 
}
</style>