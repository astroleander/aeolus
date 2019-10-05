<template>
  <button class="btn-icon add-btn">
    <div class="add-icon"></div>
    <div class="btn-text">
      <slot/>
    </div>
  </button>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.btn-icon {
  border: none;
  width: 50px;
  height: 50px;
  background: #FB3;
  border-radius: 999px;
  overflow: hidden;
  position: relative;
  transition:  width 0.2s ease-in-out;
}

.add-btn {
  &:before, &:after {
    content: "";
    position: absolute;
    height: 4px;
    width: 10px;
    top: calc(50% - 2px);
    background: #333;
    transition: width 0.2s ease-in-out, border-radius 0.2s ease-in-out;
  }
  &:after {
    right: 14px;
    overflow: hidden;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
  &:before {
    left: 14px;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  &:hover {
    width: 210px;
     &:before, &:after {
      width: 4px;
      border-radius: 2px;
    }
  }  
  &:hover .btn-text {
    opacity: 1;
  }
}

.btn-icon:focus {
  outline: none;
}
.btn-text {
  opacity: 0;
  transition: opacity 0.2s;
}
// 控制图标的显示
.add-icon::after,
.add-icon::before {
  transition: all 0.2s ease-in-out;
  content: "";
  position: absolute;
  height: 20px;
  width: 2px;
  top: calc(50% - 10px);
  background: #333;
  overflow: hidden;
}
.add-icon::before {
  left: 23px;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.add-icon::after {
  right: 23px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
.add-btn:hover .add-icon::before {
  left: 15px;
  height: 4px;
  top: calc(50% - 2px);
}
.add-btn:hover .add-icon::after {
  right: 15px;
  height: 4px;
  top: calc(50% - 2px);
}
</style>

<style>
</style>