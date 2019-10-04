<template>
  <article>
    
  </article>
</template>

<script>
export default {
  mounted() {
    require.context('@g/components/buttons', true, /vue$/, 'lazy')
  },
}
</script>

<style>

</style>