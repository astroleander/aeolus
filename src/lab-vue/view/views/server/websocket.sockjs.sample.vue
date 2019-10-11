<template>
  <article>
    <div class="chart" ref="chart"></div>
  </article>
</template>

<script>
import SockJS from 'sockjs-client'
import echarts from 'echarts'

export default {
  data() { return {
    ws: null
  } },
  mounted() {
    this.initSocket();
    this.initChart();
  },
  methods: {
    updateChart(data) {
      let form = JSON.parse(data);
      this.chart.setOption({
        series: [{
          data: form,
        }]
      });
    },
    initChart() {
      this.chart = echarts.init(this.$refs.chart);
      this.chart.setOption({
        xAxis: {
          axisLine:{
            lineStyle:{
              width: 2,
            }
          }
        },
        yAxis: {
          axisLine:{
            lineStyle:{
              width:2,
            }
          }
        },
        series: [{
            symbolSize: 20,
            data: [
              [10.0, 8.04],
              [8.0, 6.95],
              [13.0, 7.58],
              [9.0, 8.81],
              [11.0, 8.33],
              [14.0, 9.96],
              [6.0, 7.24],
              [4.0, 4.26],
              [12.0, 10.84],
              [7.0, 4.82],
              [5.0, 5.68]
            ],
            type: 'scatter'
        }],
      });
    },
    initSocket() {
      this.ws = new SockJS('http://localhost:9999/ws');
      this.ws.console = {
        log: (witch, ...args) => {
            console.log('[ws]',`[${witch}]`,...args)
        }     
      }
      this.ws.onopen = e => {
        this.ws.console.log('onopen', e)
      }
      this.ws.onmessage = e => {
          this.ws.console.log('onmessage', e)
          this.updateChart(e.data)
      }
      this.ws.onclose = e => {
          this.ws.console.log('onclose', e)
      }
    }
  },
}
</script>

<style scoped lang='scss'>
.chart {
  width: 100vw;
  height: 100vh;
}
</style>