<template>
  <div class="global-container">
    <router-view/>
    <router-link to="/">
      <div class="floating-button" id="vue-common-layout-floating-button">
        <p class="cross">+</p>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.global-container {
  width: 100%;
  min-height: 100vh;
  // overflow-x: hidden;
  overflow: hidden;
}
</style>
