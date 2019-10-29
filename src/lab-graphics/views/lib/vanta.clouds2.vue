<template>
  <article class="fullscreen">
    <section class="fullscreen flex-container" id="clouds">
        <button class="aeolus-button" @click="entry">
          Entrance
          <div id="progress-mask" class="progress disabled">
            <div id="progress-first" class="disabled progress progress-first"></div>
            <div id="progress-second" class="disabled progress progress-second"></div>
          </div>
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
    async entry(e) {
      let ele = document.querySelector('.aeolus-button')
      ele.style['border-radius'] = '50%'
      ele.style.padding = '0px'
      ele.style.background = '#FB8'
      for (const child of ele.childNodes) {
        if (child.nodeName === '#text') {
          ele.removeChild(child)
          break;
        }
      }

      TweenLite.to(this, 5, {  
        speed: 50,
        ease: Power1.easeIn,
      })

      let [mask, first, second] = document.querySelectorAll('.progress')

      Promise.resolve().then(_ => {
        return new Promise((resolve) => {
          setTimeout(_ => { resolve('waiting for transition') }, 1000)
        })
      }).then(done => {
        document.querySelector('#progress-mask').classList.remove('disabled')
        document.querySelector('#progress-first').classList.remove('disabled')
        return rotate(first.style)
      }).then(done => {
        mask.style.clip = 'auto'
        document.querySelector('#progress-second').classList.remove('disabled')
        return rotate(second.style)
      }).then(done => {
        return new Promise(resolve=> {
          ele.style.background = '#8bc34a'
          setTimeout(_ => { resolve('waiting for transition') }, 600)
        })
      }).then(done => {
        return easeOutSacle(ele)
      }).then(done => {
        this.$router.push({name:'animation/greenpage'})
      })
      
      function easeOutSacle(ele) {
        return new Promise((resolve, reject) => {
          let x = 0;
          let border = 0;
          let interval = setInterval(_ => {
            if (border > document.body.offsetWidth) { 
              clearInterval(interval)
              resolve()
            }
            ele.style['box-shadow'] = ` 0px 0px 0px ${border}px #8bc34a`
            x += 1
            border = Math.pow(x, 2)
          }, 5)
        })
      }
      function rotate(ele) {
        return new Promise((resolve, reject) => {
          let deg = 0;
          let interval = setInterval(_ => {
            if (deg > 180) { 
              clearInterval(interval)
              resolve()
            }
            ele.transform = 'rotate('+ deg +'deg)'
            deg += 1
          }, 15)
        })
      }
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

.aeolus-button {
  position: relative;
  transition: all 0.6s, box-shadow 0s;
  height: 80px;
  min-width: 80px;
  text-align: center;
  overflow: hidden;
  .disabled {
    display: none;
  }
  .progress {
    &#progress-mask {
      clip: rect(0px,80px,80px,40px);
      background:#FB8;
    }
    &.progress-first {
      clip: rect(0px,40px,80px,0px);
      background: #8bc34a;
    }
    &.progress-second {
      clip: rect(0px,80px,80px,40px);
      background: #8bc34a;
      // transform: translateZ(41px)
    }
    position: absolute;
    height: 80px;
    width: 80px;
    top:0%;
    left: 0%;
    // background: #FB8;
  }
}

</style>


<style>
</style>
