<template>
  <article>
    <div v-html="html"></div>
  </article>
</template>

<script>
import Config from '@/config'

export default {
  data() {
    return {
      html: ''
    }
  },
  methods: {
    getHTML() {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', Config.django.url('home_page/'), true)
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
