<template>
  <article class="button_container">
    <template v-for="name in name_list">
      <component v-bind:is='name' :key="name">{{name}}</component>
    </template>
  </article>
</template>

<script>
/**
 * @description 一次关于自动化读取组件的尝试
 */

function getComponentButtons() {
  /**
   * 第一步，我们构造形如标准 Vue 语法中的 components: {...} 对象
   * 区别在于, 对于组件指定的部分我们采取 Vue 异步组件的声明方式 
   * 我们所引入的对象是一个返回目标组件的 Promise
   * 
   * 异步组件:
   * (@see https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6)
   * 组件自动化注册:
   * (@see https://cn.vuejs.org/v2/guide/components-registration.html#%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6%E7%9A%84%E8%87%AA%E5%8A%A8%E5%8C%96%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C)
   */
  let res = {}
  /**
   * 第二步, 遍历目标目录, 读取所有文件, 根据文件名生成名字和生成 import 函数
   */
  require.context('@g/components/buttons', true, /vue$/, 'lazy').keys().forEach(async e => {
    let name = e.replace(/^\.\//,'').replace(/\.vue$/, '');
    res[name] = () => import('../../components/buttons/' + e.replace(/^\.\//,''))
  })
  return res
}
let componentList = getComponentButtons();

/**
 * 第三步, 这个名称表是要拿来当关键字的, 所以往 data 里塞一份, 不然模块调用不了
 * 
 * 我们利用 component v-bind:is 的方式遍历名称数组, 按名字加载所有组件
 */
export default {
  components: componentList,
  mounted() {
    console.log(this.name_list)
  },
  data() {
    return {
      name_list: Object.keys(componentList)
    }
  }
}
</script>

<style>
</style>

<style lang="scss" scoped>
.button_container {
  display: flex;
  flex-direction: row;
  button {
    margin: 20px;
    // height: 60px;
    // width: 210px;
  }
}
</style>