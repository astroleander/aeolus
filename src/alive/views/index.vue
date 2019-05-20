<template>
<!-- 
  这里存在一个一直被人忽视的错误, 
  你在 main.js 中注入的那个初始页面，
  不能作为路由的入口页面
    - 比如在这里，从 mian.js 中注入了 alive.vue, 
      此时 alive 的 router-view 就已经导航到根路由了, 
      此时如果我们在 alive.vue 中引用的和根路由要加载的是同一个页面
      那么这个页面会加载两次
-->
  <div>
    <alive-header></alive-header>
    <router-view></router-view>
  </div>
</template>

<script>
import aliveHeader from './dashboard/header'

export default {
  components: {
    aliveHeader
  }
}
</script>

<style>

</style>
