<template>
  <article class="flex-container row">
    <section class="gallery">
      <div class="view" :style="{'box-shadow':this.getTo}">
      </div>
    </section>
    <section class="controller">
      <p v-for="(each, key) in this['box_shadow']" :key="key">
        <input v-model="box_shadow[key]"/>
        <input type="button" name="delete" value="x"
          @click="deleteItem(box_shadow, key)"
        />
        
      </p>
      <input type="button" name="add" value="add box-shadow"
        @click="addToBoxShadow()"
      />
    </section>
  </article>
</template>

<script>
export default {
  data() {
    return {
      box_shadow: [
        '0px 0px 0px 2px #fa807233',
        '0px 0px 0px 8px #fa807233',
        '0px 0px 0px 16px #fa807233'
      ],
    }
  },
  computed: {
    getTo() {
      return this['box_shadow'].filter(item => !(item.length === 0)).join(',')
    }
  },
  methods: {
    addToBoxShadow() {
      let str = this.box_shadow && this.box_shadow[this.box_shadow.length - 1] || ''
      str = str.replace(/0px\s*0px\s0px\s([0-9]{1,})px/, (...args)=> {
        return args[0].replace(args[1], Number(args[1]) * 2); 
      })
      this.box_shadow.push(str)
    },
    deleteItem(who, idx) {
      this.box_shadow.splice(idx, 1)
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
  width: 120px;
  height: 120px;
}

textarea, input {
  width: 100%;
}
textarea {
  min-height: 200px;
}
</style>
