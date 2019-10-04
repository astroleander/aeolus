<template>
  <button>
    <div class="left"></div>
    <slot/>
    <div class="right"></div>
  </button>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Source+Code+Pro:200,900');

button {
  border: none;
  background: none;
  cursor: pointer;
  padding: 10px 20px;
  font-family: "Source Code Pro";
  font-weight: 900;
  text-transform: uppercase;
  font-size: 22px;  
  color: hsla(210, 50%, 85%, 1);

  background-color: hsl(210, 80%, 42%);
  box-shadow: hsla(210, 40%, 52%, .4) 2px 2px 22px;
  border-radius: 4px; 
  z-index: 0;  
  overflow: hidden;

  &:focus {
    outline-color: transparent;
    box-shadow: hsl(210, 80%, 42%) 2px 2px 22px;
  }

  position: relative;
}
// right::after 是上面的黑框
// button:::after 是背后的细字
.right:after, button::after {
  content: 'FlushButton';
  width: 100%;
  height: 100%;
  padding: 40px 40px;
  display: block;
  position: absolute;
  white-space: nowrap;
  padding: 40px 80px; // 需要放大上面的那个黑框，在这里同时放大上面和下面两个伪元素框
  pointer-events:none;
}
button::after{
  // 细字要和粗体重合
  font-weight: 200;
  top: -30px;
  left: -80px;
} 

.right, .left {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
}
.right {
  left: 66%;
}
.left {
  right: 66%;
}

.right:after {
  top: -32px;
  left: calc(-66% - 40px);
  
  background-color: #141218;
  color:transparent;
  transition: transform .4s ease-out;
  transform: translate(0, -90%) rotate(0deg)
}


button:hover .right::after {
  transform: translate(0, -47%) rotate(0deg)
}

button .right:hover::after {
  transform: translate(0, -50%) rotate(-7deg)
}

button .left:hover ~ .right::after {
  transform: translate(0, -50%) rotate(7deg)
}
</style>