<!-- @inspireby yourpalnurav https://codepen.io/yourpalnurav/pen/LqNmzL -->
<template>
  <button class="brk-btn">
    <slot />
  </button>
</template>

<!--
  这个相对而言就很简单了，两个伪元素放在边框上， hover 的时候平移即可
-->
<script>
export default {
}
</script>

<style lang="scss" scoped>
.brk-btn {
  position: relative;
  background: none;
  color: indigo;
  text-transform: uppercase;
  text-decoration: none;
  border: 0.2em solid indigo;
  padding: 0.5em 1em;
   &::before {
    content: "";
    display: block;
    position: absolute;
    width: 10%;
    background: white;
    height: 0.3em;
    right: 20%;
    top: -0.21em;
    transform: skewX(-45deg);
    -webkit-transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
    transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 10%;
    background: white;
    height: 0.3em;
    left: 20%;
    bottom: -0.25em;
    transform: skewX(45deg);
    -webkit-transition: all 0.45 cubic-bezier(0.86, 0, 0.07, 1);
    transition: all 0.45s cubic-bezier(0.86, 0, 0.07, 1);
  }
  &:hover {
    &::before {
      right: 80%;
    }
    &::after {
      left: 80%;
    }
  }
}
</style>

<style>
</style>