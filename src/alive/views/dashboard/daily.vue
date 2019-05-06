<template>
  <article>
    <p v-for="(item, index) in value" :key="index">
      {{item.node.name}}
    </p>
  </article>
</template>

<script>
export default {
  props:['value']
}
</script>

<style>

</style>
