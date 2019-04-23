<template>
  <article>
    A Test for yield
    <section>
      <p><code>
      {{list}}
      </code></p>
    <button @click="add">Add</button>
    </section>
    <section>
      <p><code>
      {{alive_list}}
      </code></p>
    <button @click="add_alive">Add</button>
    </section>  </article>
</template>

<script>
const generateNumber = function* (i) {
  while (i<2) {
    yield i
    i += 1
  } 
}

export default {
  data() {
    return {
      list: [],
      i: 0,
      alive_list: [],
      alive_iterable: generateNumber(0)
    }
  },
  methods: {
    add() {
      let iterable = generateNumber(this.i)
      this.list.push(iterable.next())
      this.list.push(iterable.next())
      this.list.push(iterable.next())
      this.list.push(iterable.next())
    },
    add_alive() {
      this.alive_list.push(this.alive_iterable.next())
      this.alive_list.push(this.alive_iterable.next())
      this.alive_list.push(this.alive_iterable.next())
      this.alive_list.push(this.alive_iterable.next())
    }
  }
}
</script>

<style>

</style>
