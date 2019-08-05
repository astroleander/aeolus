<template>
  <article>
    <div ref="chart" class="chart"></div>
    {{getCalendar}}
  </article>
</template>

<script>
import axios from 'axios'
// import charts from 'echarts'
/**
 * 按需引入后,这个包的体积从4m下降到了1.2mb,
 * echarts 的部分仅占 800kb
 */
import charts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/line'

export default {
  data: function() {
    return {
      selected: ['JPY','EUR','USD'],
      eur: [],
      cny: [],
      loading: true
    }
  },
  methods: {
    generatePairs: function(res) {
      const eur = []
      const parser = new DOMParser();
      const xml = parser.parseFromString(res.data, 'text/xml');

      xml.querySelectorAll('[time]').forEach(date_cube => {
        let eur_to_cny = null;
        const daily_currency = {
          date: date_cube.getAttribute('time'),
          pairs: (() => {
            const pair = [];
            for (let pair_cube of date_cube.children) {
              const next_pair = {
                currency: pair_cube.getAttribute('currency'),
                rate: pair_cube.getAttribute('rate')
              }
              if (next_pair.currency === 'CNY') {
                eur_to_cny = next_pair.rate
                pair.push({ 
                  currency: 'EUR',
                  rate: 1
                })
              } else {
                pair.push(next_pair)
              }
            }
            return pair
          })(),
          eur_to_cny: null
        }
        daily_currency.eur_to_cny = eur_to_cny
        eur.push(daily_currency)
      })
      this.loading = false
      return new Promise((resolve, reject) => {
        console.log(eur)
        resolve(eur)
      })
    },
    calculatedCNY: function(eur) {
      return new Promise((resolve, reject) => {
        eur.forEach(daily_pair_list => {
          let eur_to_cny = daily_pair_list.eur_to_cny;
          const pairs = []
          daily_pair_list.pairs.forEach(pair => {
            pairs.push({
              currency: pair.currency,
              rate: (pair.rate / eur_to_cny).toFixed(4),
              rate_frac: (eur_to_cny / pair.rate).toFixed(4)
            })
          })
          const p = { date: daily_pair_list.date, pairs }
          this.cny.push(p)
        })
        console.log(this.cny)
        resolve(this.cny)
      })
    },
    fetchExchangeRateList: function() {
      return axios.get('/api/v1/ecb/stats/eurofxref/eurofxref-hist-90d.xml');
    },
    buildChart: function(cny) {
      let chart = charts.init(this.$refs.chart, 'light')
      chart.setOption({
        // Make gradient line here
        visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0.09,
        }, {
            show: false,
            type: 'continuous',
            seriesIndex: 1,
            dimension: 0,
            min: 0.09,
        }],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
        },
        yAxis: {},
        dataset: {
          source: this.getChartDataset
        },
        series: [
          {type: 'line'},
          {type: 'line'},
          {type: 'line'}
        ]
      })
    }
  },
  computed: {
    getCalendar: function() {
      const res = []
      for (let daily_currency of this.cny) {
        daily_currency.pairs = daily_currency.pairs.filter(pair => this.selected.includes(pair.currency))
      }
      return this.cny
    },
    getChartDataset: function() {
      let dataset = []
      for (let item of this.cny) {
        let new_item = {
          date: item.date,
        }
        for (let pair of item.pairs) {
          new_item[pair.currency] = pair.rate
        }
        dataset.push(new_item)
      }
      console.log(dataset)
      return dataset.reverse()
    }
  },
  created: function() {

  },
  mounted: function() {
    this.fetchExchangeRateList()
      .then(res => this.generatePairs(res))
      .then(eur => this.calculatedCNY(eur))
      .then(cny => this.buildChart(cny))
  }
}
</script>

<style lang="scss" scoped>
.chart {
  min-width: 100vh;
  min-height: 80vh;
}
</style>
