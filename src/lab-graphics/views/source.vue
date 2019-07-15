<script>
export default {
  data: function() {
    return {
      list: [
        ['https://www.html.cn/archives/8629', 'flex'],
        ['https://zhuanlan.zhihu.com/p/25016633', 'svg'],
        ['https://codepen.io/arcs/pen/oxRQqa?page=6', 'line canvas'],
        ['https://codepen.io/arcs/pen/QEWGgM?page=6', 'line canvas'],
        ['https://codepen.io/arcs/pen/oxRQqa?page=6', 'line canvas'],
        ['https://codepen.io/JulianLaval/pen/KpLXOO', 'line canvas'],
        ['http://bl.ocks.org/NPashaP/2ad2fcceadb8a6907098', 'Convex Hull'],
        ['https://medium.com/walkme-engineering/debounce-and-throttle-in-real-life-scenarios-1cc7e2e38c68', 'debounce'],
        ['https://www.vantajs.com/#(alignment:32,backgroundAlpha:0.9202432045779685,backgroundColor:5940,cohesion:100,color1:11147545,color2:53759,colorMode:varianceGradient,quantity:5,separation:59,speedLimit:9,wingSpan:30)', 'birds'],
        ['https://www.webdesignerdepot.com/2016/10/4-modern-background-tricks-to-try-out/','backgrounds'],
        ['https://github.com/mojs/mojs', '一个可以模仿的简单一点的库']
      ]
    }
  }
}
</script>

<template>
  <ul>
    <li v-for="link in list" :key="link[1]">
      <a :href="link[0]">{{link[1]}}</a>
    </li>
  </ul>
</template>


