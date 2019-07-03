<template>
  <div>
    <header>
      <a href="/">Top</a>
      <a v-for="entry in entries" :key="entry.title"
        :href="entry.path">
        {{entry.title}}
      </a>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import { entries } from '#res/config'
export default {
  data() {
    return {
      entries: entries
    }
  }
}
</script>

<style>

</style>
