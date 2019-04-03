<template>
  <article class="container">
    <div id="editor">
      <textarea :value="input" @input="update"></textarea>
      <div v-html="compileMarkdown"></div>
    </div>
  </article>
</template>

<script>
import _ from 'lodash'
import marked from 'marked'

export default {
  data() {
    return {
      input: '# hello'
    }
  },
  computed: {
    compileMarkdown: function () {
      return marked(this.input, { sanitize: true })
    }
  },
  methods: {
    update: _.debounce(function (e) {
      this.input = e.target.value
    }, 300)
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh
}
#editor{
  height: 100vh;
  * {
    display: inline-block;
    width: 49%;
    height: 100%;
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
  }
  textarea{
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
  }
}
</style>
