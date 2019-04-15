<template>
  <article class="flex-middle">
    <aeo-progress-bar></aeo-progress-bar>
    <aeo-progress-bar v-model="test"></aeo-progress-bar>
    {{test.value}} / {{test.total}}
    <button @click="()=>{this.test.value+=40}">++</button>
  </article>
</template>

<script>
import AeoProgressBar from '@lv/view/components/common/ProgressBar'

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
article {
  width: 80%;
}
</style>
