<template>
  <article class="flex-middle">
    <section>
    <p>Customary Directives:</p>
    </section>
    <section>
    <!-- <p>Directives Test Queue:</p> -->
    <p v-test="test">Here will be replaced</p>
    <input type="text" v-focus v-model="test"/>
    </section>
    
    <section>
      <p><code>bind</code>{{bind}}</p>
      <p><code>inserted</code>{{inserted}}</p>
      <p><code>update</code>{{update}}</p>
      <p><code>componentUpdated</code>{{componentUpdated}}</p>
      <p><code>unbind</code>{{unbind}}</p>
    </section>

    <section>
      <div v-output:foo.a.b="test"></div>
    </section>
  </article>
</template>

<script>
export default {
  data() {
    return {
      bind: '只调用一次，指令第一次绑定到元素时调用。用这个钩子函数可以定义一个仅在绑定时执行一次。',
      inserted: '被绑定元素插入父节点时调用。父节点存在即可，无需存在于 document 上。',
      update: '被绑定元素所在的模板更新时使用。无论绑定值是否变化都会更新。通过比较更新前后的绑定值，可以忽略不必要的模板更新。',
      componentUpdated: '被绑定元素所在模板元素完成一次更新周期时调用。',
      unbind: '只调用一次，指令与元素解绑时调用。',
      test: 'test'
    }
  },
  directives: {
    focus: {
        // insert bind hook herez
        inserted: function(el) {
        el.focus()
      }
    },
    test: {
      bind: function(el, binding, vnode, oldVnode) { 
        console.log('[bind]', el, binding, vnode, oldVnode); console.log('[Bind]'); },
      inserted: function(el, binding, vnode, oldVnode) { console.log('[inserted]')},
      update: function(el, binding, vnode, oldVnode) { 
        console.log('[update]'); 
        el.innerHTML = binding.value 
        },
      componentUpdated: function(el, binding, vnode, oldVnode) { console.log('[componentUpdated]') },
      unbind: function(el, binding, vnode, oldVnode) { console.log('[unbind]') },
    },
    output: {
      bind: function(el, binding, vnode, oldVnode) {
        let s = JSON.stringify
        el.innerHTML = 
          'name: '        + s(binding.name)       + '<br>' +
          'value: '       + s(binding.value)      + '<br>' +
          'expression: '  + s(binding.expression) + '<br>' +
          'argument: '    + s(binding.arg)        + '<br>' +
          'modifiers: '   + s(binding.modifiers)   + '<br>' +
          'vnode keys: '  + Object.keys(vnode).join('. ')

      }
    }
  },
  methods:{
    printlog(array) {

    }
  }
}
</script>

<style>

</style>
