<template>
  <article class="fullscreen">
    <section class="fullscreen flex-container" id="clouds">
        <button class="button" @click="entry">
          Entrance
          <div id="progress-first" class="disabled progress progress-first"></div>
          <div id="progress-second" class="disabled progress progress-second"></div>
        </button>
    </section>
  </article>
</template>

<script>
import '#res/libs/vanta/vanta.clouds2.min.js'
import TweenLite from 'gsap/TweenLite'

export default {
  data() {
    return {
      speed: 0.4,
      cloud: null
    }
  },
  mounted() {
    this.cloud = VANTA.CLOUDS2({
      el: "#clouds",
      texturePath: "/src/res/libs/vanta/noise.png",
      speed: this.speed
    })  
  },
  methods: {
    entry(e) {
      // 1
      let ele = document.querySelector('.button')
      ele.style['border-radius'] = '50%'
      ele.style.padding = '0px'
      for (const child of ele.childNodes) {
        if (child.nodeName === '#text') {
          ele.removeChild(child)
          break;
        }
      }
      ele.style.background = '#FB8'
      document.querySelectorAll('.disabled').forEach(e=>{
        e.classList.remove('disabled')
      })

      // TweenLite.to(this, 10, {  
      //   speed: 50,
      //   ease: Power1.easeIn,
      //   // onComplete: ()=>{},
      //   // onCompleteParams: ['[animation complete]']
      // })

      let tansfromRotate
      let [first, second] = document.querySelectorAll('.progress')

      function rotate(ele, z) {
        return new Promise((resolve, reject) => {
          let deg = 0;
          let interval = setInterval(_ => {
            if (deg > 180) { 
              clearInterval(interval)
              resolve()
            }
            ele.transform = 'rotate('+ deg +'deg)'
            deg += 1
          }, 1)
        })
      }

      Promise.resolve().then(done => {
        return rotate(first.style, 1)
      }).then(done => {
        // second.style.background = '#FB8'
        first.style.transform += ' translateZ(2000px)'
        second.style.transform = 'rotate(30deg) translateZ(0px)'

        // return rotate(second.style, 3)
      }).then(done => {
        return new Promise(resolve=> {

        })
      })
    }
  },
  watch: {
    speed(newVal){
      // console.log(this.cloud.options.speed)
      this.cloud.options.speed = newVal
    }
  }
}
</script>

<style lang="scss" scoped>
.fullscreen {
  position: absolute;
  top:0%;
  left: 0%;
}

.button {
  perspective: 10000;
  position: relative;
  transform-style: preserve-3d;
  transition: all 0.4s;
  height: 80px;
  min-width: 80px;
  text-align: center;
  overflow: hidden;
  .disabled {
    display: none;
  }
  .progress {
    &.progress-first {
      clip: rect(0px,80px,80px,40px);
      transform-style: preserve-3d;
      top:0%;
      left: 0%;
      background: #412FF4;
      // transform: translateZ(50px)
    }
    &.progress-second {
      clip: rect(0,40px,80px,0px);
   transform-style: preserve-3d;
     top:0%;
      left: 0%;
      background: #8bc34a;
      // transform: translateZ(41px)
    }
    position: absolute;
    height: 80px;
    width: 80px;
    // background: #FB8;
  }
}

</style>


<style>
</style>
