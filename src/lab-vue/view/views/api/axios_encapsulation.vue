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
    const service = axios.create({})
    service.interceptors.response.use(
      res => {
        console.log('[1.interceptors]')
        console.log(res)
        // return Promise.resolve(res)
        return res
      },
      error => {
        return Promise.reject(error)
      })
    const proxy = function() {
      return service.get('/api/v1/bing/HPImageArchive.aspx?format=js&idx=0&n=1').then(res => {
        console.log('[2.proxy]')
        console.log(res)
        // return Promise.resolve(res)
        return res
      })       
    }
    const promise_request = new Promise((resolve, reject) => {
      proxy().then(res => {
        console.log('[3.promise_request]')
        console.log(res)
        resolve(res)
      })
    })

    const resovle_request = Promise.resolve('[0. Promise resolve]')
    console.log(resovle_request)
    resovle_request.then(()=>promise_request).then(res => {
      console.log('[4.business]')
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
