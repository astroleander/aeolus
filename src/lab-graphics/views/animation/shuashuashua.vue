<template>
  <!-- 尝试制造一个唰唰唰的效果 -->
  <article class="flex-container col">
    <section class="full focus-center">
      <div id="shuashuashua-by-css" class="full grid-container grid-7 row">
        <div class="card">1</div>
        <div class="card">2</div>
        <div class="card">3</div>
        <div class="card">4</div>
        <div class="card">2</div>
        <div class="card">3</div>
        <div class="card">4</div>
      </div>
      <p>局限性还是蛮大的，同屏显示 n 个块就得有 n 个假块。这 n 个假块还必须放在 n 个块之后 算不上什么好办法</p>
      <button id="btn-shuashuashua-by-css" class="button mini" style="margin:12px;">
        click me to start animtion
      </button>
    </section>
    <section class="full focus-center" id="mixedmethod">

    </section>
  </article>
</template>

<script>
import { setInterval } from 'timers';
export default {
  mounted() {
    const p = document.getElementById('shuashuashua-by-css');
    const btn = document.getElementById('btn-shuashuashua-by-css');
    btn.addEventListener('click', e => {
      p.classList.add('animation')
    })
  },
}
</script>


<style lang="scss" scoped>
section:nth-child(even) {
  background: lightgoldenrodyellow
}
#shuashuashua-by-css {
  padding:10px;
  // background: repeating-linear-gradient(90deg,white 01, transparent 5%, transparent 95%, white 100%);
  clip-path: polygon(25% -20px, 50% -20px, 50% 150%, 25% 150%);
}

.card {
  height: 200px;
  width: 100%;
  &:nth-child(1){
    background: red;
  }
  &:nth-child(2), &:nth-child(5){
    background: lightblue;
  }
  &:nth-child(3), &:nth-child(6){
    background: lightcoral;
  }
  &:nth-child(4), &:nth-child(7){
    background: yellowgreen;
  }
}

.animation {
  overflow: hidden;
  div {
    animation: shuashuashuacss 3s forwards infinite normal;
  }
}
@keyframes shuashuashuacss {
  from {
    transform: translateX(0%);
  }
  33% {
    transform: translateX(-100%);
  }
  67% {
    transform: translateX(-200%)
  }
  100% {
    transform: translateX(-300%);
  }
}
</style>


<style>

</style>
