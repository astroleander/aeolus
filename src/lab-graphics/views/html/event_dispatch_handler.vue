<template>
  <article class="fullscreen">
    <section
      id="outter-layer"
      @click="e=>listener(e, 'outter one')"
      class="match-parent padding-kid"
    >
      <section
        id="middle-layer"
        @click="e=>listener(e, 'middle one')"
        class="match-parent padding-kid"
      >
        <section
          id="inner-layer"
          @click="e=>listener(e, 'inner one')"
          class="match-parent padding-kid"
        >
          <input type="checkbox" v-model="stopPropagation" name="stopPropagation ?" />
          <label for="stopPropagation">[@click] stopPropagation</label>
          <br>
          <input type="checkbox" v-model="preventDefault" name="preventDefault ?" />
          <label for="preventDefault">[eventListener] preventDefault (useless)</label>
          <br>
          <input type="button" v-on:mouseover='(e)=>hoverButton(e, "hover-button")' name="21" value="hover to trigger"/>
          preventDefault 只能阻止默认事件，没别的功能
          stopPropagation 只能阻止冒泡，js DOM 无法控制分发过程
        </section>
      </section>
    </section>
  </article>
</template>

<script>
export default {
  data() {
    return {
      stopPropagation: true,
      preventDefault: true,
      events: []
    };
  },
  methods: {
    listener(el, description) {
      console.log('[@click][listener]', description, el);
      this.stopPropagation ? el.stopPropagation() : "";
      return false;
    },
    hoverButton(el, description) {
      // this.events[0].e.dispatchEvent(MouseEvent.relatedTarget)
      console.log('[hover][dispatcher]', description, el);
    }
  },
  mounted() {
    let f,e
    for (const layer of ['outter', 'middle', 'inner']) {
      e = document.querySelector(`#${layer}-layer`)
      f = (el)=>{
          console.log(`[addEventListener][click] ${layer}`, el)
          this.preventDefault ? e.preventDefault:''
      }
      e.addEventListener('click', el => f)
      this.events.push({e, f})
    }
  },
  destroyed() {
    this.events.forEach((pair) => {
      pair.e.removeEventListener('click', (pair.f))
    })
  }
};
</script>

<style lang="scss" scoped>
#outter-layer,
#middle-layer,
#inner-layer {
  padding: 80px;
  box-sizing: border-box;
}
#outter-layer {
  background: #ff7043;
}
#middle-layer {
  background: #ff9800;
}
#inner-layer {
  background: #ffca28;
}
</style>
