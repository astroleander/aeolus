<template>
  <article class="focus-center">
    <aeo-progress-bar></aeo-progress-bar>
    <aeo-progress-bar v-model="test"></aeo-progress-bar>
    {{test.value}} / {{test.total}}
    <button @click="()=>{this.test.value+=40}">++</button>
  </article>
</template>

<script>
import AeoProgressBar from '@v/view/components/common/ProgressBar'

export default {
  data() {
    return {
      test: {
        total: 200,
        value: 100,
      }
    }
  },
  components: {
    AeoProgressBar
  }
}
</script>

<style>
</style>
