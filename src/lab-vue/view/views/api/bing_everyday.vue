<template>
  <article class="fullscreen">
    <img :src="this.res" width="100%" height="100%"/>
  </article>  
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      res: null
    }
  },
  mounted() {
    axios
      .get('/api/v1/bing/HPImageArchive.aspx?format=js&idx=0&n=1')
      .then(res => {
        console.log(res)
        const url = '/api/v1/bing' + res.data.images[0].url
        this.res = url
    })
  },
}
</script>

<style lang="scss" scoped>
img {
  object-fit: cover;
}
</style>
