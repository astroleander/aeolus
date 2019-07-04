<template>
  <article class="flex-middle">
    <section>
      <p class="num">{{count_down}}</p>
    </section>
    <section>
      <input name="plus1s" type="button" value="+ 1s" @click="plus(1)"/>
    </section>
  </article>
</template>

<script>
export default {
  data() {
    return {
      count_down: 10,
      counter: null,
      interval: 1000,
    }
  },
  mounted() {
    this.setAnimated(this.count_down);
  },
  methods: {
    setAnimated(count_down) {
      this.counter = setInterval(() => {
        this.count_down -= 1
      }, this.interval);
    },
    plus(sec) {
      this.count_down += 1
    }
  },
  watch: {
    count_down(val) {
      if (val < 2) {
        clearInterval(this.counter)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.num {
  font-size: 2em;
}
</style>
