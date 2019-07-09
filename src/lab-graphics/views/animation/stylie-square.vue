<template>
  <article class="flex-container column">
    <a href="http://jeremyckahn.github.io/stylie/">@powerby github.stylie</a>
    <div id="ball" class="ball stylie"></div>
    <div id="ball2" class="ball stylie"></div>
    <div id="ball3" class="ball stylie"></div>
    <div id="ball4" class="ball stylie"></div>
  </article>
</template>

<script>
export default {

}
</script>

<style>

</style>

<style lang="scss" scoped>
.ball {
  position: fixed;
  top:100px;
  left: 50%;
  right: 50%;
  width: 50px;
  height: 50px;
}
#ball {
  background: #000;
}
#ball2 {
  background: #DDD;
  animation-delay: 1000ms;
}
#ball3 {
  background: #666;
  animation-delay: 2000ms;
}
#ball4 {
  background: #EEE;
  animation-delay: 3000ms;
}

.stylie {
  animation-name: stylie-transform-keyframes;
  animation-duration: 4000ms;
  animation-delay: 0ms;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  transform-origin: 0 0;
}
@keyframes stylie-transform-keyframes {
  0% {transform:translate(0px, 0px) scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translate(-50%, -50%);}
  0.83% {transform:translate(6.6667px, 6.6667px) scale(1.0333) rotateX(0deg) rotateY(0deg) rotateZ(0.1333deg) translate(-50%, -50%);}
  1.67% {transform:translate(13.3333px, 13.3333px) scale(1.0667) rotateX(0deg) rotateY(0deg) rotateZ(0.2667deg) translate(-50%, -50%);}
  2.5% {transform:translate(20px, 20px) scale(1.1) rotateX(0deg) rotateY(0deg) rotateZ(0.4deg) translate(-50%, -50%);}
  3.33% {transform:translate(26.6667px, 26.6667px) scale(1.1333) rotateX(0deg) rotateY(0deg) rotateZ(0.5333deg) translate(-50%, -50%);}
  4.17% {transform:translate(33.3333px, 33.3333px) scale(1.1667) rotateX(0deg) rotateY(0deg) rotateZ(0.6667deg) translate(-50%, -50%);}
  5% {transform:translate(40px, 40px) scale(1.2) rotateX(0deg) rotateY(0deg) rotateZ(0.8deg) translate(-50%, -50%);}
  5.83% {transform:translate(46.6667px, 46.6667px) scale(1.2333) rotateX(0deg) rotateY(0deg) rotateZ(0.9333deg) translate(-50%, -50%);}
  6.67% {transform:translate(53.3333px, 53.3333px) scale(1.2667) rotateX(0deg) rotateY(0deg) rotateZ(1.0667deg) translate(-50%, -50%);}
  7.5% {transform:translate(60px, 60px) scale(1.3) rotateX(0deg) rotateY(0deg) rotateZ(1.2deg) translate(-50%, -50%);}
  8.33% {transform:translate(66.6667px, 66.6667px) scale(1.3333) rotateX(0deg) rotateY(0deg) rotateZ(1.3333deg) translate(-50%, -50%);}
  9.17% {transform:translate(73.3333px, 73.3333px) scale(1.3667) rotateX(0deg) rotateY(0deg) rotateZ(1.4667deg) translate(-50%, -50%);}
  10% {transform:translate(80px, 80px) scale(1.4) rotateX(0deg) rotateY(0deg) rotateZ(1.6deg) translate(-50%, -50%);}
  10.83% {transform:translate(86.6667px, 86.6667px) scale(1.4333) rotateX(0deg) rotateY(0deg) rotateZ(1.7333deg) translate(-50%, -50%);}
  11.67% {transform:translate(93.3333px, 93.3333px) scale(1.4667) rotateX(0deg) rotateY(0deg) rotateZ(1.8667deg) translate(-50%, -50%);}
  12.5% {transform:translate(100px, 100px) scale(1.5) rotateX(0deg) rotateY(0deg) rotateZ(2deg) translate(-50%, -50%);}
  13.33% {transform:translate(106.6667px, 106.6667px) scale(1.5333) rotateX(0deg) rotateY(0deg) rotateZ(2.1333deg) translate(-50%, -50%);}
  14.17% {transform:translate(113.3333px, 113.3333px) scale(1.5667) rotateX(0deg) rotateY(0deg) rotateZ(2.2667deg) translate(-50%, -50%);}
  15% {transform:translate(120px, 120px) scale(1.6) rotateX(0deg) rotateY(0deg) rotateZ(2.4deg) translate(-50%, -50%);}
  15.83% {transform:translate(126.6667px, 126.6667px) scale(1.6333) rotateX(0deg) rotateY(0deg) rotateZ(2.5333deg) translate(-50%, -50%);}
  16.67% {transform:translate(133.3333px, 133.3333px) scale(1.6667) rotateX(0deg) rotateY(0deg) rotateZ(2.6667deg) translate(-50%, -50%);}
  17.5% {transform:translate(140px, 140px) scale(1.7) rotateX(0deg) rotateY(0deg) rotateZ(2.8deg) translate(-50%, -50%);}
  18.33% {transform:translate(146.6667px, 146.6667px) scale(1.7333) rotateX(0deg) rotateY(0deg) rotateZ(2.9333deg) translate(-50%, -50%);}
  19.17% {transform:translate(153.3333px, 153.3333px) scale(1.7667) rotateX(0deg) rotateY(0deg) rotateZ(3.0667deg) translate(-50%, -50%);}
  20% {transform:translate(160px, 160px) scale(1.8) rotateX(0deg) rotateY(0deg) rotateZ(3.2deg) translate(-50%, -50%);}
  20.83% {transform:translate(166.6667px, 166.6667px) scale(1.8333) rotateX(0deg) rotateY(0deg) rotateZ(3.3333deg) translate(-50%, -50%);}
  21.67% {transform:translate(173.3333px, 173.3333px) scale(1.8667) rotateX(0deg) rotateY(0deg) rotateZ(3.4667deg) translate(-50%, -50%);}
  22.5% {transform:translate(180px, 180px) scale(1.9) rotateX(0deg) rotateY(0deg) rotateZ(3.6deg) translate(-50%, -50%);}
  23.33% {transform:translate(186.6667px, 186.6667px) scale(1.9333) rotateX(0deg) rotateY(0deg) rotateZ(3.7333deg) translate(-50%, -50%);}
  24.17% {transform:translate(193.3333px, 193.3333px) scale(1.9667) rotateX(0deg) rotateY(0deg) rotateZ(3.8667deg) translate(-50%, -50%);}
  25% {transform:translate(200px, 200px) scale(2) rotateX(0deg) rotateY(0deg) rotateZ(4deg) translate(-50%, -50%);animation-timing-function: cubic-bezier(.25,.25,.75,.75);}
  50% {transform:translate(0px, 400px) scale(1) rotateX(0deg) rotateY(0deg) rotateZ(143deg) translate(-50%, -50%);animation-timing-function: cubic-bezier(.25,.25,.75,.75);}
  75% {transform:translate(-200px, 200px) scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translate(-50%, -50%);animation-timing-function: cubic-bezier(.25,.25,.75,.75);}
  100% {transform:translate(0px, 0px) scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translate(-50%, -50%);}
}html::after { content: url(https://ga-beacon.appspot.com/UA-42910121-1/stylie?pixel); position: absolute; left: -999em; }
</style>
