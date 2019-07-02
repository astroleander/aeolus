<template>
  <article>
    <div v-for="(css, idx) in css_list" :key="idx"
      :class="['container','b'+idx]">
      <p>{{css}}</p>
    </div>
  </article>
</template>

<script>
export default {
  data: function() {
    return {
      css_list: [
        'repeating-linear-gradient',
        'repeating-readial-graient',
        'it can not work with graient',
        'an animation test',
      ],
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background: #333;
}

.b3 {
  background: #CA88CA;
  animation: ani 3.15s linear;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
@keyframes ani {
  from { background: #EE8FCA }
  to { background: #EF003A }
}

.b2 {
  background: radial-gradient(#FFF 0px, #333 100%);
  animation: gradient 3.15s linear;
  animation-iteration-count: infinite;
}

@keyframes gradient {
  from { background: radial-gradient(#FFF 0px, #333 100%) }
  to { background: radial-gradient(#FFF 0px, #DFA633 100%) }
}

.b1 {
  background: radial-gradient(#FFF 0px, #000 100%);
}

.b0 {
  background: repeating-linear-gradient(45deg, #FFF 0px, #FFF 15px,#DFA633 15px, #DFA633 30px);
}

.container {
  height: 300px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  p {
    padding: 15px;
    height: 2em;
    color: #EEE;
    background: #76AA00;
    box-shadow: #666 2px 2px 8px;
    font-size: 1.8em;
  }
}
</style>
