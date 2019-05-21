<template>
  <header>
      <div class="menu"></div>
      <a href="/lab_vue">vue lab</a>
      <a href="/lab_react">react lab</a>
  </header>
</template>

<script>
export default {

}
</script>

<style>

</style>

<style lang="scss" scoped>
header {
  box-shadow: 0px 2px 2px #AAAA;
  display: flex;
  flex-direction: row;
  align-content: center;
  height: 50px;
  width: 100vw;
  background: white;
  position: fixed;
  top: 0;
  z-index: 999;
  a {
    margin: auto 12px;
  }
}


</style>
