<template>
  <article class="fullscreen">
    <section class="fullscreen" id="chinamap" v-html="map">

    </section>
  </article>
</template>

<script>
import ChinaMap from '@/res/assets/china.svg'
import { setTimeout } from 'timers';
const clearText = (map) => {
  Array.from(map.getElementsByTagName('text')).forEach(e => {
    map.removeChild(e);
  })
}
function mouseoverSvg(e, el) {
  // 从浏览器外移动进来的 fromElement 是 null
  if (
    e.fromElement && e.fromElement.tagName === 'path' &&
    e.toElement.tagName === 'svg'
   ) {
    console.log('trigger', e.fromElement.tagName)
    clearText(el);
   }
}
function mouseoverPath(e, el) {
  if (el.tagName === 'svg') {
    clearText(map); return;
  }
  if (el.tagName !== 'path') return;
  let nodebox = el.getBBox();
  let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', nodebox.x + nodebox.width / 2);
  text.setAttribute('y', nodebox.y + nodebox.height / 2);
  text.setAttribute('id', `text-${el.getAttribute('title')}`);
  text.textContent = el.getAttribute('title');
  let map = document.getElementById('svg-china-map');
  clearText(map)
  map.appendChild(text)
}
function mouseout(e, el) {
  /**
   * “在移出的时候清除省份名” 这种方法并不是很好，
   * BUG 在于移动到新建的 text 上也会触发 mouse out，
   * 造成闪烁
   * 
   */
  // if (el.tagName !== 'path') return;
  // setTimeout(() => {
  //   let map = document.getElementById('svg-china-map');
  //   map.removeChild(document.getElementById(`text-${el.getAttribute('title')}`));
  // }, 200);
}
export default {
  name: 'svg-sample',
  data() { 
    return {
      map: ChinaMap
    }
  },
  mounted() {
    let map = document.getElementById('svg-china-map');
    Array.from(map.children).forEach(element => {
      element.addEventListener('mouseover', (e) => mouseoverPath(e, element))
    });
    map.addEventListener('mouseover',(e) => mouseoverSvg(e, map))
    // Array.from(map.children).forEach(element => {
    //   element.addEventListener('mouseout', (e) => mouseout(e, element))
    // });
  },
  beforeDestroy() {
    let map = document.getElementById('svg-china-map');
        Array.from(map.children).forEach(element => {
      element.removeEventListener('mouseover', (e) => mouseoverPath(e, element))
    });
    map.removeEventListener('mouseover',(e) => mouseoverSvg(e, map))
    // Array.from(map.children).forEach(element => {
    //   element.removeEventListener('mouseout', (e) => mouseout(e, element))
    // });
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
  text {
    pointer-events: none;
    fill: #333;
  }
}
</style>
