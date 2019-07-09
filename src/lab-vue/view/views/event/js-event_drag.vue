<template>
  <article class="flex-container col fullscreen">
    <section class="center" style="display: flex; flex-direction: row;">
      <div id="test" class="div type-test" draggable=true
        @drag="(ev)=> printDrag(ev, '2 drag')"
        @dragenter="(ev)=> printDrag(ev, '2 dragenter')"
        @dragover="(ev)=> printDrag(ev, '2 dragover')"
        @dragstart="(ev)=> printDrag(ev, '2 dragstart')"
        @dragleave="(ev)=> printDrag(ev, '2 dragleave')"
        @dragend="(ev)=> printDrag(ev, '2 dragend')"
      >
      </div>
      <div id="red" class="div type-red" draggable=true data='red'
        @dragstart="handleDrag">
      </div>
      <div id="amber" class="div type-amber" draggable=true data='amber'
        @dragstart="handleDrag">
      </div>
      <div id="lime" class="div type-lime" draggable=true data='lime'
        @dragstart="handleDrag">
      </div>
    </section>
    <section class="drop"
      @dragover="allowDrop"
      @drop="handleDrop"
    >
    {{list}}
    </section>
    <section class="center">
      <code>@drag="xxx"</code> equals to <code>v-on:drag="xxx"</code>, which binds defaultly to original HTML drag event by vue directives 
      <p><strong>The point of handle drag/drop events by vue is HOW TO GET AND OPERAT VNODE</strong></p>
    </section>
  </article>
</template>

<script>
export default {
  data: function() {
    return {
      list: []
    }
  },
  methods: {
    printDrag(e, op) {
      console.log(op);
    },
    allowDrop(e) {
      e.preventDefault();
    },
    handleDrag(e) {
      e.dataTransfer.setData('drag', e.target.getAttribute('data'))
    },
    handleDrop(e) {
      let color = e.dataTransfer.getData('drag')
      this.addColor(color)
    },
    
    addColor(color) {
      if (this.list.length > 10) {
        this.list.shift()
        this.list.push(color)
      } else {
        this.list.push(color)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.div {
  width: 120px;
  height: 30px;
  margin: 10px;
}
.type-test {
  background-image: repeating-linear-gradient(45deg, #666 0px, #666 15px, transparent 15px, transparent 30px)
}
.type-red {
  background-image: repeating-linear-gradient(45deg, #f44336 0px, #f44336 15px, transparent 15px, transparent 30px)
}
.type-amber {
  background-image: repeating-linear-gradient(135deg, #ffb300 0px, #ffb300 15px, transparent 15px, transparent 30px)
}
.type-lime {
  background-image: repeating-linear-gradient(135deg, #cddc39 0px, #cddc39 15px, transparent 15px, transparent 30px)
}
.drop {
  margin: 10px;
  border: #666 1px solid;
  width: 70vw;
  min-height: 40px;
}
</style>
