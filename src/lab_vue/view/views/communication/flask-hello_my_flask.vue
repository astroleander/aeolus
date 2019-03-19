<template>
  <article>
    get msg from 127.0.0.1:5000 ...
    <p>{{msg}}</p>
    <p v-html="mashaji"></p>
    <p>{{time}}</p>
  </article>
</template>

<script>
import {flask} from '@/config'

export default {
  data() {
    return {
      msg: null,
      mashaji: null,
      time: null
    }
  },
  methods: {
    request5000() {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', flask.url());
      xhr.send();
      xhr.onload = () => {
        this.msg = xhr.response
      }
    },
    anotherrequest5000() {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', flask.url('route'));
      xhr.onload = () => {
        this.mashaji = xhr.response
      }
      xhr.send();
    },
    request5000stime() {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', flask.url('api/time'));
      xhr.onload = () => {
        this.time = xhr.response
      };
      xhr.send();
    }
  },
  mounted() {
    this.request5000()
    this.anotherrequest5000()
    this.request5000stime()
  }
}
</script>

<style>

</style>
