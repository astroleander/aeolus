<template>
  <article class="flex-container column">
    <p>copy from <a href='https://cn.vuejs.org/v2/guide/transitioning-state.html'>https://cn.vuejs.org/v2/guide/transitioning-state.html</a></p>
    <section>
      <svg width="300" height="300">
        <polygon class="green" :points="points"></polygon>
        <polygon class="amber" :points="points2"></polygon>
        <circle cx="150" cy="150" r="125"></circle>
      </svg>
    </section>
    <section>
      <label>Sides: {{ sides }}</label>
      <input 
        type="range" 
        min="3" 
        max="500" 
        v-model.number="sides"
      >
      <label>Minimum Radius: {{ minRadius }}%</label>
      <input 
        type="range" 
        min="0" 
        max="90" 
        v-model.number="minRadius"
      >
      <label>Update Interval: {{ updateInterval }} milliseconds</label>
      <input 
        type="range" 
        min="10" 
        max="2000"
        v-model.number="updateInterval"
      >
    </section>
  </article>
</template>

<script>
import TweenLite from 'gsap/TweenLite'
export default {
  data: function () {
  	var defaultSides = 10
  	var stats = Array.apply(null, { length: defaultSides })
      .map(function () { return 100 })
    var stats2 = Array.apply(null, { length: defaultSides })
    	.map(function () { return 100 })

  	return {
    	stats: stats,
    	stats2: stats2,
    	points: generatePoints(stats),
    	points2: generatePoints2(stats2),
      sides: defaultSides,
      minRadius: 50,
      interval: null,
      updateInterval: 500
    }
  },
  watch: {
  	sides: function (newSides, oldSides) {
    	var sidesDifference = newSides - oldSides
      if (sidesDifference > 0) {
      	for (var i = 1; i <= sidesDifference; i++) {
        	this.stats.push(this.newRandomValue())
        	this.stats2.push(this.newRandomValue())
        }
      } else {
        var absoluteSidesDifference = Math.abs(sidesDifference)
      	for (var i = 1; i <= absoluteSidesDifference; i++) {
        	this.stats.shift()
        	this.stats2.shift()
        }
      }
    },
    stats: function (newStats) {
			TweenLite.to(
      	this.$data, 
        this.updateInterval / 1000, 
        { points: generatePoints(newStats) }
      )
    },
    stats2: function (newStats) {
			TweenLite.to(
      	this.$data, 
        this.updateInterval / 1000, 
        { points2: generatePoints2(newStats) }
    	)
    },
    updateInterval: function () {
    	this.resetInterval()
    }
  },
  mounted: function () {
  	this.resetInterval()
  },
  methods: {
    randomizeStats: function () {
    	var vm = this
    	this.stats = this.stats.map(function () {
      	return vm.newRandomValue()
      })
      this.stats2 = this.stats.map(function () {
      	return vm.newRandomValue()
      })
    },
    newRandomValue: function () {
    	return Math.ceil(this.minRadius + Math.random() * (100 - this.minRadius))
    },
    resetInterval: function () {
    	var vm = this
    	clearInterval(this.interval)
      this.randomizeStats()
    	this.interval = setInterval(function () { 
      	vm.randomizeStats()
      }, this.updateInterval)
    }
  }
}

function valueToPoint (value, index, total) {
  var x     = 0
  var y     = -value * 0.9
  var angle = Math.PI * 2 / total * index
  var cos   = Math.cos(angle)
  var sin   = Math.sin(angle)
  var tx    = x * cos - y * sin + 150
  var ty    = x * sin + y * cos + 150
  return { x: tx, y: ty }
}

function valueToPoint2 (value, index, total) {
  var x     = 0
  var y     = -value * 0.9
  var angle = Math.PI * 2 / total * index
  var cos   = Math.cos(angle)
  var sin   = Math.sin(angle)
  var tx    = (x * cos - y * sin) * 0.6 + 150
  var ty    = (x * sin + y * cos) * 0.6 + 150
  return { x: tx, y: ty }
}

function generatePoints (stats) {
	var total = stats.length
	return stats.map(function (stat, index) {
    var point = valueToPoint(stat, index, total)
    return point.x + ',' + point.y
  }).join(' ')
}

function generatePoints2 (stats) {
	var total = stats.length
	return stats.map(function (stat, index) {
    var point = valueToPoint2(stat, index, total)
    return point.x + ',' + point.y
  }).join(' ')
}
</script>

<style lang="scss" scoped>
svg { display: block; }
polygon.amber { fill: #FFF; }
polygon.green { fill: #41B883; }
circle {
  fill: transparent;
  stroke: #666;
}
input[type="range"] {
  display: block;
  width: 100%;
  margin-bottom: 15px;
}
</style>
