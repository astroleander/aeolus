<template>
  <article>
    <svg width="400" height="400">
      <!-- <polygraph :stats="stats"></polygraph> -->
      <g>
        <polygon :points="points"></polygon>
        <circle cx="200" cy="200" r="160"></circle>
        <!-- label -->
        <text
          v-for="(stat, index) in stats" :key="index"
          :x="point(stat, index, stats.length).x" :y="point(stat, index, stats.length).y">
          {{ stat.label }}
        </text>
      </g>
    </svg>
    <section>
      <div v-for="(stat, index, key) in stats" :key="key">
        <label>{{stat.label}}</label>
        <!-- !!! default range not return Number type !!! -->
        <input type="range" v-model.number="stat.value" min="0" max="200"/>
        <span>{{stat.value}}</span>
        <button @click="remove(stat)" class="remove">x</button>
      </div>
      <form id="add">
        <input name="newlabel" v-model="newLabel"/>
        <button @click="add">Add a Stat</button>
      </form>
      <!-- the tag pre is used to render preformatted text -->
      <pre id="raw">{{ stats }}</pre>
    </section>
  </article>
</template>

<script>
const stats = [
  { label: 'A', value: 100 },
  { label: 'B', value: 100 },
  { label: 'C', value: 100 },
  { label: 'D', value: 100 },
  { label: 'E', value: 100 },
  { label: 'F', value: 100 }
]

// math helper...
function valueToPoint (value, index, total) {
  var x     = 0
  var y     = -value * 0.8
  var angle = Math.PI * 2 / total * index
  var cos   = Math.cos(angle)
  var sin   = Math.sin(angle)
  // var tx    = x * cos - y * sin + 200
  var tx    = - y * sin + 200
  var ty    = y * cos + 200
  return {
    x: tx,
    y: ty
  }
}

export default {
  data() {
    return {
      newLabel: '',
      stats: stats
    }
  },
  methods: {
    add(e) {
      e.preventDefault();
      if(!this.newLabel) return
      this.stats.push({
        label: this.newLabel,
        value: 200
      })
      this.newLabel = ''
    },
    remove(stat) {
      if (this.stats.length > 3) {
        this.stats.splice(this.stats.indexOf(stat), 1)
      } else {
        alert('Can\'t delete more')
      }
    },
    point: function(stat, index, total) {
      console.log('execute',stat.value, index, total)
      return valueToPoint(
        stat.value + 10,
        index,
        total
      )
    }
  },
  computed: {
    points: function() {
      let total = this.stats.length
      return this.stats.map((stat, i) => {
        let point = valueToPoint(stat.value, i, total)
        return point.x + ',' + point.y
      }).join(' ')
    }
  }
}
</script>

<style lang="scss" scoped>
polygon {
    fill: #42b983;
    opacity: .75;
}

circle {
    fill: transparent;
    stroke: #999;
}

text {
    font-family: Helvetica Neue, Arial, sans-serif;
    font-size: 10px;
    fill: #666;
}

label {
    display: inline-block;
    margin-left: 10px;
    width: 20px;
}

#raw {
    position: absolute;
    top: 0;
    left: 50%;
}
</style>

<style>

</style>
