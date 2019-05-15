<template>
  <article class="flex-cols flex-middle">
    <section class="gallery">
      <div class="view" :style="{'box-shadow':this.getTo}">
      </div>
    </section>
    <section class="controller">
      <p v-for="(each, key) in this['to_box_shadow']" :key="key">
        <input v-model="to_box_shadow[key]"/>
      </p>
      <input type="button" name="add" value="add box-shadow"
        @click="addToBoxShadow"
      />
    </section>
  </article>
</template>

<script>
export default {
  data() {
    return {
      from_box_shadow : [
        '0px 0px 0px 12px #fa8072AA',
        '0px 0px 0px 24px #fa8072AA',
        '0px 0px 0px 48px #fa8072AA'
      ],
      to_box_shadow: [
        '0px 0px 0px 12px #fa8072AA',
        '0px 0px 0px 24px #fa8072AA',
        '0px 0px 0px 48px #fa8072AA'
      ],
    }
  },
  computed: {
    getTo() {
      return this['to_box_shadow'].filter(item => !(item.length === 0)).join(',')
    }
  },
  methods: {
    addToBoxShadow() {
      this.to_box_shadow.push('')
    }
  }
}
</script>

<style>

</style>

<style lang="scss" scoped>
.gallery {

}
.view {
  margin: auto;
  background: salmon;
  width: 150px;
  height: 150px;
}

textarea, input {
  width: 100%;
}
textarea {
  min-height: 200px;
}
</style>
