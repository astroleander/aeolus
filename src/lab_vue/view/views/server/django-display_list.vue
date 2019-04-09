<template>
  <article>
    <section>
      <pre>
      {{xhrRequest}}
      </pre>
    </section>
    <section>
      {{axiosRequest}}
    </section>
  </article>
</template>

<script>
import {django} from '@/config'

export default {
  data() {
    return {
      xhrRequest: null,
      axiosRequest: null,
      url: django.url('list/task/')
    }
  },
  methods: {
    fetchXhr() {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', this.url)
      xhr.onload = () => {
        this.xhrRequest = xhr.responseText
      }
      xhr.send()
    },
    fetchAxios() {

    }
  },
  mounted() {
    this.fetchXhr()
    this.fetchAxios()
  }
}
</script>

<style lang="scss" scoped>
 
</style> 

<style>

</style>
