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
import { entries } from '#res/definitions'
export default {
  data() {
    return {
      entries: entries
    }
  }
}
</script>

<style scoped lang='scss'>
a {
  font-size: 1.2em;
  font-family: 'Roboto', serif;
  text-decoration: none;
  color: #212121;
  transition: all 0.2s;
  &:active, &:visited{
    color: #212121;
  }
  &:hover {
    color: #D62800;
  }
}
</style>
