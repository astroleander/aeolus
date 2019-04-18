<template>
  <article class="flex-middle">
    <h4>using v-model on custom component</h4>
    <custom-input v-model="searchText"></custom-input>
    {{searchText}}
  </article>
</template>

<script>
import Vue from 'vue'
import CustomInput from '@lv/view/components/sample/CustomInput'

export default {
  components: {
    'custom-input': CustomInput
  },
  data() {
    return {
      searchText: null
    }
  }
}
</script>

<style>

</style>
