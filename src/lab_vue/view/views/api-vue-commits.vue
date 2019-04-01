<template>
  <article>
    <h1>Lastest Vue.js Commits</h1>
    <!-- you can not using SAME :key in child node when you refer to -->
    <template v-for="(branch, idx) in branches" >
      <input type="radio" :key="idx"
      :id="branch"
      :value="branch"
      name="branch"
      v-model="currentBranch"
      />
      <label :for="branch" :key="branch">{{ branch }}</label>
    </template>
    <p>vuejs/vue@{{ currentBranch }}</p>
    <ul>
      <li v-for="record in commits" :key="record.sha">
        <a :href="record.html_url" target="_blank" class="commit">
          {{ record.sha.slice(0, 7)}}
        </a>
        - <span class="message">{{ record.commit.message | truncate }}</span>
        by <span class="author">
            <a :href="record.author.html_url" target="_blank">{{ record.commit.author.name }}</a>
          </span>
        at <span class="date">{{ record.commit.author.date | formatDate }}</span>
      </li>
    </ul>
    <section>
      <h2>commits(resopnse):</h2>
      <ul>
        <li v-for="(items, key, index) in commits" :key="index">
          {{key}}{{index}}
          <ul>
          <li v-for="(item, key, index) in items" :key="index">
            [{{index}}]<span style="color:red">{{key}}</span>:{{item}}
          </li>
          </ul>
        </li>
      </ul>
    </section>
  </article>
</template>
      </li>

<script>
const apiURL = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha='

export default {
  data() {
    return {
      branches: ['master', 'dev'],
      currentBranch: 'master',
      commits: null
    }
  },
  created: function() {
    this.fetchData()
  },
  watch: {
    currentBranch: 'fetchData'
  },
  filters: {
    truncate: function(v) {
      const newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v
    },
    formatDate: function(v) {
      return v.replace(/T|Z/g, ' ')
    }
  },
  methods: {
    fetchData() {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', apiURL + this.currentBranch)
      xhr.onload = () => {
        this.commits = JSON.parse(xhr.responseText)
        console.log(this.commits[0].html_url) 
      }
      xhr.send()
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #f66;
}
li {
  line-height: 1.5em;
  margin-bottom: 20px;
}
.author, .date {
  font-weight: bold;
}
</style>
