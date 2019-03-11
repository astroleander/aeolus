<template>
  <div class="global-container">
    <router-view/>
    <router-link to="/">
      <div id="floating-button">
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
}

#floating-button {
  width: 55px;
  height: 55px;

  border-radius: 50%;
  background: #db4433;
  box-shadow: 0px 2px 4px #666;

  cursor: pointer;

  position: fixed;
  bottom: 20px;
  right: 20px;
  transition: 0.15s all;

  &:active {
    background: #333;
    transition: 0.15s all;
  }

  .cross {
    font-family: 'Roboto';
    color: white;

    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    padding: 0;
    margin: 0;
    line-height: 55px;
    font-size: 38px;
    transform: rotate(45deg);
    transition: all 0.3s;
    animation: cross-rotate-in 0.5s linear;
    animation-fill-mode: forwards;

    &:hover {
      animation: cross-rotate-out 0.15s linear;
      animation-fill-mode: forwards;
    }
  }
}

@keyframes cross-rotate-in {
  from { transform: rotate(225deg)}
  to { transform: rotate(45deg);}
}

@keyframes cross-rotate-out {
  from { transform: rotate(45deg)}
  to { transform: rotate(225deg);}
}
</style>
