<template>
  <article class="flex-container row start-start">
    <section>
      <div class="transition-background">
        background - transition, click me
      </div>
    </section>
    <section>
      <div class="animation">
        background - animation
      </div>
    </section>
    <section>
      <div class="animation-step">
        background - animation step
        (not supported)
      </div>
    </section>
    <section>
      <div class="transition-shadow">
      box-shadow - transition, hover me
      </div>
    </section>
    <section>
      <div class="transition-shadow-2">
      box-shadow - transition, hover me
      </div>
    </section>
    <section>
      <div class="animation-shadow">
      box-shadow - animation, target effect
      </div>
    </section>
    <section>
      <div class="animation-shadow-alternate-reverse">
      box-shadow - animation, alternate-reverse
      </div>
    </section>
    <section>
    <div class="animation-shadow-2">
      box-shadow - animation, anthoer animtion keyframes
      </div>
    </section>
    <section>
    <div class="animation-shadow-freso">
      a complex way - using freso element
    </div>
    </section>

  </article>
</template>

<script>
export default {

}
</script>

<style>
</style>

<style lang="scss" scoped>
.row{
  box-sizing: border-box;
  section {
    div {
      box-sizing: border-box;
      width: 150px;
      height: 150px;
      margin: 25px;
      padding: 10px;
    }
    outline: 2px solid black;
    width: 250px;
    height: 250px;
    box-sizing: border-box;
    margin: 10px;
    padding: 25px;

  }
  .transition-background {
    background: red;
    transition: background 2s;

      &:hover {
        background: pink radial-gradient(circle, transparent 1%, pink 1%) center/15000%
      }
      &:active {
        background-color: red;
        background-size: 100%;
        transition: background 0s
      }
    }
  .animation {
      animation: ripple 2s linear infinite;
  }
  .animation-step {
      animation: ripple-step 2s steps(100, end) infinite;
  }
  .transition-shadow {
    background: red;
    transition: box-shadow 1s;

    &:hover {
      box-shadow: 0px 0px 0px 12px #fa8072,
                  0px 0px 0px 24px #fa8072,
                  0px 0px 0px 48px #fa8072;
      transition: box-shadow 1s;
    }
  }
  .transition-shadow-2 {
    background: red;
    transition: box-shadow 1s;

    &:hover {
      box-shadow: 0px 0px 0px 12px #fa8072AA,
                  0px 0px 0px 24px #fa8072AA,
                  0px 0px 0px 48px #fa8072AA;
      transition: box-shadow 1s;
    }
  }
  .animation-shadow {
     animation: ripple-shadow 2s infinite;
  }
  .animation-shadow-alternate-reverse {
     animation: ripple-shadow 2s alternate-reverse infinite;
  }
  .animation-shadow-2 {
     animation: ripple-shadow-2 2s infinite;
  }
  .animation-shadow-freso {
    position: relative;  
    animation: ripple-shadow-freso 3s infinite;
    &::before, &::after {
      content: "";
      position: absolute;
      top:0;
      left:0;
      right:0;
      bottom:0;
      // border-radius: 50%;
      animation: ripple-shadow-freso 3s infinite 1s;
    }
    &::before {
      animation: ripple-shadow-freso 3s infinite 2s;
    }
  }

}

@keyframes ripple {
  from {
    background: pink;
  }
  3% {
    background: pink radial-gradient(circle, red 3%, transparent 3%);
  }
  5% {
    background: pink radial-gradient(circle, red 5%, transparent 5%);
  }
  10% {
    background: pink radial-gradient(circle, red 10%, transparent 10%);
  }
  25% {
    background: pink radial-gradient(circle, red 25%, transparent 25%);
  }
  50% {
    background: pink radial-gradient(circle, red 50%, transparent 50%);
  }
  75% {
    background: pink radial-gradient(circle, red 75%, transparent 75%);
  }
  to {
    background: red;
  }
}

@keyframes ripple-step {
  // from {
  //   background: pink;
  // }
  to {
    background: pink radial-gradient(circle, red 50%, transparent 50%);
  }
}

@keyframes ripple-shadow {
  to {
    box-shadow: 0px 0px 0px 12px #fa8072AA,
            0px 0px 0px 24px #fa8072AA,
            0px 0px 0px 48px #fa8072AA;
  }
}

@keyframes ripple-shadow-2 {
  from {
    box-shadow: 0px 0px 0px 0px #fa8072AA,
            0px 0px 0px 12px #fa8072AA,
            0px 0px 0px 24px #fa8072AA;
  }
  to {
    box-shadow: 0px 0px 0px 12px #fa8072AA,
            0px 0px 0px 24px #fa8072AA,
            0px 0px 0px 48px #fa8072AA;
  }
}

@keyframes ripple-shadow-freso {
  from {
    box-shadow: 0px 0px 0px 10px #fa8072AA,
  }
  to {
    box-shadow: 0px 0px 0px 48px #fa807200,
  }
}
</style>
