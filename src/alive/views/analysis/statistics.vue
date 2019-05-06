<template>
  <article class="box">
    <div class="icon ripple"></div>
    <p>{{this.value.number}}</p>
  </article>
</template>

<script>
export default {
  props: ['value']
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  flex-wrap: nowrap;
  padding: 16px;
  .icon {
    height: 64px;
    width: 64px;
    margin-right: 16px;
    border-radius: 50%;
  }
}

/* Ripple effect */
.ripple {
  background-position: center;
  background-color: #47a7f5;

  transition: background 0.8s;
  &:hover {
    background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%) center/15000%;
  }
  &:active {
    background-color: #6eb9f7;
    background-size: 100%;
    transition: background 0s;
  }
}


</style>
