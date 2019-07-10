<template>
  <article class="match-parent fullscreen">
    <section class="one-screen sample-1">
      <!-- 每一个都是一样的，按照默认填充规则填充 -->
      <div class="child" :style="`background:${colorGroup[idx]};`" v-for="(repeatel, idx) in Array(32).fill('')" :key="idx">
      </div>
    </section>
    <section class="one-screen sample-2">
      <!-- 标记 Grid Item、Grid Line、Grid Track、Grid Cell、Grid Area-->

      <div class="child" :style="`background:${colorGroup[idx]};`" 
          v-for="(repeatel, idx) in Array(32).fill('')" :key="idx"
          :class="makeUpClassByIndex(idx)"></div>
    </section>
    <section class="one-screen"></section>
    <section class="one-screen"></section>
    <section class="one-screen"></section>

  </article>
</template>
 
<style lang="scss" scoped>
// CSS 大概对这个页面更重要
.sample-1 {
  display: grid;
  grid-template-rows: repeat(8, 12.5%);
  grid-template-columns: repeat(8, 12.5%);
  .child {
    text-align: center;
  }
}
.sample-2 {
  display: grid;
  grid-template-rows: repeat(8, 12.5%);
  grid-template-columns: repeat(8, 12.5%);
  .child {
    text-align: center;
  }
  .grid-item-location {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 4;
  }
  .grid-item-location-span {
    grid-column-start: 1;
    grid-column-end: span 5;
    grid-row-start: 1;
    grid-row-end: span 1;
  }
}
.one-screen:nth-child(even) {
  background: #EEEA;
}
</style>


<script>
/**
 * @description 附带一个 debouncing 小例子，
 * @function VueObject.onScroll 以同步 Promise 的方法启动防抖动滚动
 * @function debouncingScroll 用于注册抖动函数
 * @function debounce 抽象的抖动函数
 */
import { setInterval, clearInterval } from 'timers';
// scroll, height, limit, e.deltaY > 0? 'down' 
function stickFramesize(scroll, height, limit, forward) {
    if (forward === 'down') {
      scroll = scroll + height - scroll % height
    } else {
      scroll = scroll - height - scroll % height
      scroll > 0 ? scroll : 0
    }
  return scroll
}

function debouncingScroll(to, wait = 100) {
  debounce(() => {
    window.scrollTo({
      top: to,
      behavior: 'smooth'
    })
  }, wait)  
}

let interval;
function debounce(fn, wait) {
  if (interval) return
  console.log('[onscroll][debounce] trigger scroll really')
  interval = setInterval(()=>{
    fn()
    clearInterval(interval)
    interval = null
    }, wait)
}

export default {
  data() {
    return {
      colorGroup: [
        '#305f72', '#f1d1b5', '#f0b7a4', '#f64072', '#fc8e60', '#f18c8e', '#78909c', '#d4e157', 
        '#59d4e8', '#f9fce1', '#fee9b2', '#50b6bb', '#d3f6f3', '#f9fce1', '#fee9b2', '#fbd1b7', 
        '#f2f6f5', '#c8dad3', '#93b5b3', '#63707e', '#17223b', '#263859', '#6b778d', '#ff6768', 
        '#e6f0b6', '#b8e9c0', '#6384b3', '#684949', '#a64942', '#ffd5be', '#ff9776', '#ff487e' 
      ],
      sample2rules: {
        0: [ 'grid-item-location-span' ],
        1: [ 'grid-item-location' ],
      }
    }
  },
  methods: {  
    onScroll(e) {
      // e.preventDefault();
      let limit = document.body.offsetHeight;
      let height = window.innerHeight
      let scroll = document.documentElement.scrollTop
      Promise.resolve(stickFramesize(scroll, height, limit, e.deltaY > 0? 'down' : 'up'))
        .then(res => debouncingScroll(res, 200))
    },
    makeUpClassByIndex(idx) {
      for (const rule in this.sample2rules) {
        console.log(rule, idx)
        if (String(rule) === String(idx)) { console.log(this.sample2rules[idx]); return this.sample2rules[idx] }
      }
    }
  },
  mounted() {
    document.body.addEventListener("onwheel" in document ? "wheel" : "mousewheel", this.onScroll, false);
  },
  destroyed() {
    document.removeEventListener("onwheel" in document ? "wheel" : "mousewheel", this.onScroll, false)
  }
}
</script>

