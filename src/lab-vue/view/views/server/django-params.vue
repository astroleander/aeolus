<template>
  <article>
    <input type="text" v-model="name"/>
    <input type="button" name="button" value="send" @click="sendXHR()"/>
    <section v-html="this.content"></section>
  </article>
</template>

<script>
import {django} from '#res/config'

const getParams = params => {
  let str = []
  for (let k in params) {
    str.push(k + '=' + params[k])
  }
  return str.join('&')
}

export default {
  data() {
    return {
      name: 'Frankenstein',
      content: 'Mary'
    }
  },
  methods: {
    sendXHR() {
      const url = django.url('task');
      const params = {
        name: this.name,
        create_date: Date.now()
      }
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url + '?' + getParams(params), true)
      // xhr.send(params)
      xhr.send()
      xhr.onload = () => {
        this.content = xhr.response
        console.log(xhr)
      }
    }
  },
}
</script>

<style>

</style>
