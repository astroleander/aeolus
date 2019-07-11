<template>
  <article class="flex-container center fullscreen" :class="style">
    <section id="periodic-table">
      <div v-for="(element, idx) in elements" :key="idx" 
        :col='element.xpos' :raw='element.ypos'
        class="element" :class="[element.phase]"
        :style="generateElementPos(element.xpos, element.ypos)"
      >
        {{element.symbol}}
        <span>{{Number(element.atomic_mass).toFixed(2)}}</span>
      </div>
    </section>
    <button class="floating-button" 
      @click="()=> { style==='light' ? style='dark': style='light'}"></button>
  </article>
</template>

<script>
export default {
  data() {
    return {
      elements: [],
      style: 'dark'
    }
  },
  mounted() {
    let ajax = new XMLHttpRequest()
    ajax.onload = (res) => {
      this.elements = JSON.parse(res.target.response).elements
    }
    ajax.open('GET', 'https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json')
    ajax.send()
  },
  methods: {
    generateElementPos(x, y) {
      return {
        'grid-row-start': y,
        'grid-column-start': x
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#periodic-table {
  display: grid;
  min-width: 80%;
  min-height: 800px;
  grid-template-rows: repeat(10, 1fr);
  grid-template-columns: repeat(18, 1fr);
}
.element {
  margin: 1px;
  padding: 2px;
  span {
    font-size: 0.5em;
  }
}
// style
article {
  transition: background 1s;
  .element {
    transition: background 1s
  }
}
.light {
  .element {
    background: #EEE;
  }
}
.dark {
  background: #444;
  .element
  {
    background: #212121;
    color: #E2E2E2;
  }
}

.floating-button {
  right: 100px;
}

</style>
