<!-- Testing new v-slot added in vue 2.6.0 -->
<template>
  <article>
    <aeo-card>
      <template v-slot:header>
        v-slot header
      </template>
      <template v-slot>
        v-slot default
      </template>
    </aeo-card>
  </article>
</template>

<script>
import AeoCard from '@lv/view/components/common/Card'

export default {
  components: {
    AeoCard
  },
}
</script>

<style>

</style>
