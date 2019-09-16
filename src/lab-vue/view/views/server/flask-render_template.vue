<template>
  <article v-html="template">

  </article>
</template>

<script>
import config from '#res/definitions'

export default {
  data() {
    return {
      template: ''
    }
  },
  mounted() {
    const url = config.flask.url('template/flask');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      this.template = xhr.response
    };
    xhr.send();
  }
}
</script>

<style>

</style>
