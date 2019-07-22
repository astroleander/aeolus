<template>
  <article class="fullscreen">
    <section class="fullscreen" id="chinamap" v-html="map">

    </section>
  </article>
</template>

<script>
import ChinaMap from '@/res/assets/china.svg'
export default {
  name: 'svg-sample',
  data() { 
    return {
      map: ChinaMap
    }
  },
  mounted() {
    let map = document.getElementById('svg-china-map');
    console.log(map);
    let node = map.getElementById('CN-50')
    console.log(node)
    let nodebox = node.getBBox()
    console.log(nodebox)
    let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', nodebox.x + nodebox.width / 2);
    text.setAttribute('y', nodebox.y + nodebox.height / 2);
    text.setAttribute('fill', '#000');
    text.textContent = node.getAttribute('title');
    map.appendChild(text)
  }
}
</script>

<style lang='scss'>
#chinamap  {
  svg {
    width: 774px;
    min-height: 570px;
  }
  path {
    transition: all 0.2s;
    fill: lightcoral;
    &:hover {
      fill: lightblue;
    }
  }
}
</style>
