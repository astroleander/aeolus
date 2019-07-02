<template>
  <section>
    <p>{{from}}</p>
    {{one}} , {{another}}
  </section>
</template>

<script>
const mixin = {
  data: function () {
    return {
      one: 'やくも ゆかり',
      from: '少女秘封倶楽部'
    }
  }
}

export default {
  mixins: [mixin],
  data() {
    return {
      one: 'マエリベリー·ハーン',
      another: 'うさみ れんこ',
    }
  }
}
</script>

<style>

</style>
