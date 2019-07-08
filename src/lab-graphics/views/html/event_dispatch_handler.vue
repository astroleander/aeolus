<template>
  <article class="fullscreen">
    <section
      id="outter-layer"
      @click="e=>listener(e, 'outter one')"
      class="matchparent padding-kid"
    >
      <section
        id="middle-layer"
        @click="e=>listener(e, 'middle one')"
        class="matchparent padding-kid"
      >
        <section
          id="inner-layer"
          @click="e=>listener(e, 'inner one')"
          class="matchparent padding-kid"
        >
          <input type="checkbox" v-model="stopPropagation" name="stopPropagation ?" />
          <label for="stopPropagation">[@click] stopPropagation</label>
          <br>
          <input type="checkbox" v-model="preventDefault" name="preventDefault ?" />
          <label for="preventDefault">[eventListener] preventDefault (useless)</label>
          <br>
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
    listener(el, decription) {
      console.log('[@click][listener]', decription, el);
      this.stopPropagation ? el.stopPropagation() : "";
      return false;
    }
  },
  mounted() {
    this.events.push([document.querySelector('#outter-layer').addEventListener('click', (e)=>{
      console.log('[addEventListener][click] outter', e)
      this.preventDefault ? e.preventDefault:''
    }), document.querySelector('#outter-layer')])

    this.events.push([document.querySelector('#middle-layer').addEventListener('click', (e)=>{
      console.log('[addEventListener][click] middle', e)
      this.preventDefault ? e.preventDefault:''
    }), document.querySelector('#outter-layer')])

    this.events.push([document.querySelector('#inner-layer').addEventListener('click', (e)=>{
      console.log('[addEventListener][click] inner', e)
      this.preventDefault ? e.preventDefault:''
    }), document.querySelector('#outter-layer')])
  },
  destroyed() {
    this.events.forEach((f) => {
      f[1].removeEventListener(f[0])
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
