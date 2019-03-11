<template>
  <article>
    <p>从这个例子我们可以看出随着需求复杂，直接在请求里处理逻辑越来越不可行<del>不，我不是写来氪金的，不是</del></p>
    <p>{{time}}</p>
    <p>ECB to CNY {{cny}}</p>
    <section>
      <table>
        <tr v-for="({ rate, currency}, idx) of list" :key="idx">
          <td>{{ currency }}</td>
          <td>{{ (cny / rate).toFixed(4) }}</td>
          <td>{{ (rate / cny).toFixed(4) }}</td>
        </tr>
      </table>
    </section>
  </article>  
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      list: [],
      time: null,
      cny: 0,
    }
  },
  mounted() {
    axios
      .get('/api/v1/ecb/stats/eurofxref/eurofxref-daily.xml')
      .then(res => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(res.data, 'text/xml');
        const cubes = xml.getElementsByTagName('Cube')
        for (let cube of cubes) {
          if (cube.hasAttribute('currency')) {
            let cur = cube.getAttribute('currency')
            let rate = cube.getAttribute('rate')
            this.list.push({
              currency: cur,
              rate
            })
            if (cur === 'CNY') {
              this.cny = rate
              this.list.push({
                currency: 'EUR',
                rate: 1
              })
            }
          } else if (cube.hasAttribute('time')) {
            this.time = cube.getAttribute('time')
          }
        }
    })
  },
}
</script>

<style lang="scss" scoped>

</style>
