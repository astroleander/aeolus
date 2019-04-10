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
    <aeo-card>
      <template v-slot:header>
        {{cardProps.labMember.firstName}}
      </template>
      <template v-slot:default="labMember">
        <!-- {{cardProps.labMember.firstName}} -->
      </template>
    </aeo-card>
    <aeo-card :dmail="{msg: 'Kurisu is dead'}">
      <template v-slot:header>
        {{cardProps.labMember.firstName}}
      </template>
      <template v-slot:default="labMember">
        <!-- {{cardProps.labMember.firstName}} -->
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
  data() {
    return {
      cardProps: {
        labMember: {
          firstName: 'Kurisu',
          lastName: 'Makise'
        }
      },
      labMember: {
        firstName: 'Kurisu',
        lastName: 'Makise'
      }
    }
  }
}
</script>

<style>

</style>
