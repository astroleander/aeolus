<template>
  <article>
    <div v-html="html"></div>
  </article>
</template>

<script>
import config from '#res/definitions'

export default {
  data() {
    return {
      html: ''
    }
  },
  methods: {
    getHTML() {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', config.django.url('tdd/home_page/'), true)
      xhr.send()
      xhr.onload = () => {
        this.html = xhr.response
        console.log(xhr)
      }
    }
  },
  mounted() {
    this.getHTML()
  }
}
</script>

<style>

</style>
