<template>
  <div :class="['aeo-card', ...classes]">
    <div class="aeo-card-title">
      <slot name="header">Card</slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'card',
  /**
   * @see https://vusjs.org/v2/guide/components-props.html
   */
  props: {
    classes: Array,
  }
}
</script>

<style lang="scss" scoped>
.aeo-card {
  min-height: 80px;
  padding: 8px;
  margin: 20px;
  border-radius: 2px;
  box-shadow: 2px 2px 5px #666;

  .aeo-card-title {
    font-size: 1.5em;
    color: #212121;
    border-bottom: #DDD 1px solid;
  }
}
</style>
