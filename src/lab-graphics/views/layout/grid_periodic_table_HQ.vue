<template>
  <article class="flex-container center fullscreen">
    <section id="periodic-table">

    </section>
  </article>
</template>

<script>
export default {
  mounted() {
    let ajax = new XMLHttpRequest()
    ajax.onreadystatechange = (res) => {
        console.log(res)
    }
    ajax.open('GET', 'https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json')
    ajax.send()
  }
}
</script>

<style>

</style>
