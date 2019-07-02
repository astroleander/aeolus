<template>
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
</template>

<script>
export default {
  props: ['value']
}
</script>

<style>

</style>
