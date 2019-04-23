<template>
  <article>
    {{o1}}
    {{b1}}
    {{o2}}
    {{b2}}
  </article>
</template>

<script>
const { o, b } = require('@lv/view/src/export-test-1.js')
import FUCK from '@lv/view/src/export-test.js'

export default {
  data: function() {
    return {
      o1: FUCK.o,
      b1: FUCK.b,
      o2: o,
      b2: b
    }
  },
  mounted: function() {
    FUCK.o.a = 3
  }
}
</script>

<style>

</style>
