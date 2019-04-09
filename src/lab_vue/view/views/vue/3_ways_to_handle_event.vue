<template>
  <article>
    <input @click="handle" type="button" value="fuck 1">
    <input @click="(e)=> handle(e,2)" type="button" value="fuck 2">
    <input @click="handle($event,3)" type="button" value="fuck 3">
    <p>
      {{event}}
      {{idx}}
    </p>
  </article>
</template>

<script>
export default {
  data() {
    return {
      event: null,
      idx: 0
    }
  },
  methods: {
    handle(e, idx) {
      this.event = e
      this.idx = idx 
    }
  }
}
</script>

<style>

</style>
