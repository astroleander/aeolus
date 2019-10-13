<template>
  <article>
    <div class="chart" ref="chart"></div>
  </article>
</template>

<script>
import io from 'socket.io-client'
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
      console.log('[websocket][socket.io] initial');
      const socket = io('http://127.0.0.1:22002/');

      socket.on('connect', () => {
        console.log('[websocket][socket.io] connected');
        socket.emit('msg', 'hello you here')
      })
      socket.on('disconnect', () => {
        console.log('[websocket][socket.io] disconnected');
      })
      socket.on('msg', (e) => {
        console.log('[websocket][socket.io] msg arrived');
        console.log(e);
      })
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