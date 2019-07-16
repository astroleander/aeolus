<template>
  <article class="match-parent fullscreen">
    <!-- 每一个都是一样的，按照默认填充规则填充 -->
    <section class="one-screen sample sample-1">
      <div class="child" :style="`background:${colorGroup[idx]};`" v-for="(repeatel, idx) in Array(32).fill('')" :key="idx">
      </div>
    </section>

    <!-- 标记 Grid Item、Grid Line、Grid Track、Grid Cell、Grid Area-->
    <section class="one-screen sample sample-2">
      <div class="child" :style="`background:${colorGroup[idx]};`" 
        v-for="(repeatel, idx) in Array(32).fill('')" :key="idx"
        :class="makeUpClassByIndex(2, idx)">{{idx}}</div>
    </section>

    <!-- 尝试 <line-name> <track-size> 语法 -->
    <section class="one-screen sample sample-3">
      <div class="child" :style="`background:${colorGroup[idx]};`" 
        v-for="(repeatel, idx) in Array(32).fill('')" :key="idx"
        :class="makeUpClassByIndex(3, idx)">{{idx}}</div>
    </section>

    <!-- 使用 grid-area 定义布局 -->
    <section class="one-screen sample sample-4">
      <div class="child" :style="`background:${colorGroup[idx]};`" 
        v-for="(repeatel, idx) in Array(32).fill('')" :key="idx"
        :class="makeUpClassByIndex(4, idx)">{{idx}}</div>
    </section>

    <!-- 测试gap -->
    <section class="one-screen sample sample-5">
      <div class="child" :style="`background:${colorGroup[idx % colorGroup.length]};`" 
        v-for="(repeatel, idx) in Array(64).fill('')" :key="idx"
        :class="makeUpClassByIndex(5, idx)">{{idx}}</div>
    </section>

    <!-- autos -->
    <!-- grid-auto 未设置 template 的块的默认大小 -->
    <!-- grid-auto-flow 填充方向 -->
    <section class="one-screen sample sample-6">
      <div class="child" :style="`background:${colorGroup[idx % colorGroup.length]};`" 
        v-for="(repeatel, idx) in Array(40).fill('')" :key="idx"
        :class="makeUpClassByIndex(6, idx)">{{idx}}</div>
    </section>


    <section>
      <p>本篇没有介绍 grid 的 justify 和 align 属性</p>
      <ul>
        <li><code>justify-items</code>横轴，未填充满的子元素在格子里可以有一定的活动空间</li>
        <li><code>align-items</code>纵轴，未填充满的子元素在格子里可以有一定的活动空间</li>
        <li><code>place-items</code>上面两个的简写</li>
        <li><code>justify-content</code>横轴，对grid的每一列在父布局的位置，最大可撑开整个父元素</li>
        <li><code>align-content</code>横轴，对grid的每一行在父布局的位置，最大可撑开整个父元素</li>
        <li><code></code>align-content</li>
        <li><code>place-content</code>上面两个的简写</li>
      </ul>

      <p>https://css-tricks.com/snippets/css/complete-guide-grid/#grid-introduction</p>
    </section>
  </article>
</template>
 
<style lang="scss" scoped>
// CSS 大概对这个页面更重要
.sample { 
  display: grid; 
  .child {
    height: 100%;
    width: 100%;
    line-height: 100PX;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.sample-1 {
  grid-template-rows: repeat(8, 12.5%);
  grid-template-columns: repeat(8, 1fr);
}
.sample-2 {
  display: grid;
  grid-template-rows: repeat(8, 12.5%);
  grid-template-columns: repeat(8, 12.5%);
  .grid-item-location {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row-start: 4;
    grid-row-end: 8;
  }
  .grid-item-location-span {
    grid-column-start: 4;
    grid-column-end: span 2;
    grid-row-start: 7;
    grid-row-end: span 1;
  }
  .grid-item-location-only-row-start {
    grid-row-start: 6;
  }
  .grid-item-location-only-row-end {
    grid-row-end: 6;
  }
  .grid-item-location-only-column-start {
    grid-column-start: 6;
  }  
  .grid-item-location-only-column-end {
    grid-column-end: 6;
  }
  .foucs-replace {
    grid-column-start: 8;
    grid-column-end: span 1;
    grid-row-start: 1;
    grid-row-end: span 1;
  }
}
.sample-3 {
  grid-template-rows: repeat(8, 12.5%);
  grid-template-columns: repeat(3, 12.5%) [col-4] 12.5% [col-5] repeat(4, 12.5%);
  .grid-item-location-col4 {
    grid-column-start: col-4;
    grid-column-end: 7;
    grid-row-start: 7;
    grid-row-end: 8;
  }
}
.sample-4 {
  grid-template-rows: repeat(8, 12.5%);
  grid-template-columns: repeat(8, 12.5%);
  /**
    * grid-template-areas 的使用格式要求比较严格，
    * 首先你必须围成矩形，三角形和分离图形都是不可以的
    * 其次 . 就像 _ 一样只是个占位符，并不会去进行实际上的计算
    * 你甚至不能留白任何有前面的行,
    * 任何写了的行就必须完整写完
    *
    * sidebar 是关键字吗 我触发了一坨bug
    *
    * 但你不用把点围成矩形
    *
    * grid-area 不要引号
    */
  grid-template-areas:
  '.      .      .      .      .        .      .      .'
  'logo   .      .      .      .        .      .      useless '
  'header header header header header   header header header'
  'main   main   main   main   .        b      .      .'
  'main   main   main   main   ss       b      .      .'
  '.      .      .      .      ss       .      .      .'
  '.      .      .      . footer footer footer footer';
  .area-limited-item-1 {
    grid-area: header
  }
  .area-limited-item-2 {
    grid-area: logo
  }
  .area-limited-item-3 {
    grid-area: main
  }
  .area-limited-item-4 {
    grid-area: b
  }
  .area-limited-item-5 {
    grid-area: footer
  }
  .area-limited-item-6 {
    grid-area: useless
  }
  .area-limited-item-7 {
    grid-area: ss
  }
}

.sample-5 {
  grid-template-rows: repeat(4, 12.5%) repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr) repeat(4, 12.5%);
  grid-gap: 20px 20px;
}

.sample-6 {
  grid-template-rows: repeat(8, 1fr);
  grid-template-columns: repeat(4, 12.5%);
  grid-auto-columns: 5%;
  grid-auto-rows: 5%;
  grid-auto-flow: column;
  .outter-one {
    grid-column: 6 / 8; 
    grid-row: 6 / span 2;
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
        31: [ 'grid-item-location-span' ],
        30: [ 'grid-item-location' ],
        29: [ 'grid-item-location-default'],
        28: ['grid-item-location-only-row-start'],
        27: ['grid-item-location-only-row-end'],
        26: ['grid-item-location-only-column-start'],
        25: ['grid-item-location-only-row-end'],
        0: ['foucs-replace']
      },
      sample3rules: {
        6: [ 'grid-item-location-col4' ]
      },
      sample4rules: {
        0: [ 'area-limited-item-0'],
        1: [ 'area-limited-item-1'],
        2: [ 'area-limited-item-2'],
        3: [ 'area-limited-item-3'],
        4: [ 'area-limited-item-4'],
        5: [ 'area-limited-item-5'],
        6: [ 'area-limited-item-6'],
        7: [ 'area-limited-item-7']
      },
      sample6rules: {
        33: ['outter-one']
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
    makeUpClassByIndex(n, idx) {
      for (const rule in this[`sample${n}rules`]) {
        if (String(rule) === String(idx)) { 
          console.log(rule, idx, this[`sample${n}rules`][idx] )
          return this[`sample${n}rules`][idx] 
          }
      }
    }
  },
  mounted() {
    document.body.addEventListener("onwheel" in document ? "wheel" : "mousewheel", this.onScroll, false);
  },
  destroyed() {
    document.body.removeEventListener("onwheel" in document ? "wheel" : "mousewheel", this.onScroll)
  }
}
</script>

