<template>
  <article>
    <h1 class="flex-middle small-box">Scroll me</h1>
    <div
      v-scroll="handleScroll"
      class="flex-middle box"
    >
      <p>1. bind scroll event to directives</p>
      <p>2. using add <code>handlerScroll</code> callback to scroll event</p>
      <p>3. when scroll to target div, delete scroll event</p>
    </div>
    
  </article>
</template>

<script>
export default {
  directives: {
    scroll: {
      inserted: function(el, binding) {
      
        console.log('[inserted]')
        console.log('el: ', el)
        console.log('binding: ', binding)
        let f = function(e) {
          // console.log('event: ', e)
          // console.log('element', el)
          console.log(binding.value(e, el))
          // binding.value === handleScroll
          if (binding.value(e, el)) {
            window.removeEventListener('scroll', f)
          }
        }
        window.addEventListener('scroll', f)
      }
    }
  },
  methods: {
    handleScroll: function(e, el) {
      console.log('execute scroll handler ', window.scrollY)
      console.log('execute scroll handler ', el)
      if (window.scrollY > 10) {
        el.setAttribute(
          'style',
          'opacity: 1; transform: translate3d(0, -10px, 0)'
        )
      }
      // the threshold to remove scroll event
      return window.scrollY > 20
      // it is funny to set a return value which is less than attr threshold
      return window.scrollY > 8
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  margin: 0;
}
.box {
  opacity: 0;
  height: 80vh;
}
.small-box {
  height: 30vh;
}

.flex-middle {
  transition: 2.5s all cubic-bezier(0.39, 0.575, 0.565, 1);
}
</style>

