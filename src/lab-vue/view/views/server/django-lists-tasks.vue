<template>
  <article>
    <section>
      <pre>
      {{xhrRequest}}
      </pre>
    </section>
    <section>
      <pre>
      {{axiosRequest}}
      </pre>
    </section>
    <section>
      <form>
        <label for="name">Name</label><input v-model="form.name" name="name" type="text"/>
        <label for="content">Content</label><input v-model="form.content" name="content" type="text"/>
        <label for="reward">Reward</label><input v-model="form.reward" name="content" type="number" />
        <input type="submit" @click.prevent="post" value="submit"/>
      </form>
    </section>
    <section>
      <button @click="delete_firset_one">delete first one</button>
    </section>
  </article>
</template>

<script>
import {django} from '@/config'
import axios from 'axios'

export default {
  data() {
    const standard_form_temp = {
        name: '',
        content: '',
        reward: null,
        finished: false,
        available: true,
        type: 'Progress',
        create_date: '1978-03-21T01:20:28Z'
      }
    return {
      xhrRequest: null,
      axiosRequest: null,
      url: django.url('list/task/'),
      form: standard_form_temp
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
      axios({
        method: 'get',
        baseURL: django.url(),
        url: 'list/task/'
      }).then(res => {
        this.axiosRequest = res.data
      })
    },
    post() {
      axios({
        method: 'post',
        baseURL: django.url(),
        url: 'list/task/',
        headers: {}, 
        data: this.form
      }).then(res => {
        this.axiosRequest = res.data
      })
    },
    delete_firset_one() {
      const url = this.axiosRequest && this.axiosRequest['results'] && this.axiosRequest['results'][0] && this.axiosRequest['results'][0]['url']
      if (url) {
        axios({
          method: 'delete',
          url,
          headers: {},
        }).then(res => {
          console.log(res)
        })
      } else {
        console.log('no res there')
      }
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
