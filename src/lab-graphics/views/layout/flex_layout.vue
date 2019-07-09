<template>
  <article class="responsibility">
    <aeo-card class="card">card 1</aeo-card>
    <aeo-card class="card">card 2</aeo-card>
    <aeo-card class="card">card 3</aeo-card>
    <aeo-card class="card">card 4</aeo-card>
    <aeo-card class="card">card 5</aeo-card>
    <aeo-card class="card">card 6</aeo-card>
    <aeo-card class="card">card 7</aeo-card>
    <aeo-card class="card">card 8</aeo-card>
  </article>
</template>

<script>
import AeoCard from '@v/view/components/common/Card'

export default {
  components: {AeoCard}
}
</script>

<style lang="scss" scoped>
.responsibility {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .card {
    box-sizing: border-box;
    width: calc(25% - 40px);
  }
  @media only screen and (min-width: 632px) and (max-width: 1280px){
    & {
      flex-direction: row;
      .card {
        width: calc(50% - 40px);
      }
    }
  } // end media
  @media only screen and (max-width: 631px){
    & {
      flex-direction: column;
      .card {
        width: calc(100% - 40px);
      }
    }
  } // end media
}


/* @media */
</style>


<style>

</style>
