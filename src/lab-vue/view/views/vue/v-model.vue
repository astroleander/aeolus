<template>
  <article>
    <aeo-card>
      <template slot="header">v-model decorator</template>
      <p>{{ model }}</p>
      <p>v-model        <input v-model="model"/></p>
      <p>v-model.lazy   <input v-model.lazy="model"/></p>
      <p>v-model.number <input v-model.number="model" type='number'/></p>
      <p>v-model.trim   <input v-model.trim="model" type='number'/></p>
    </aeo-card>

    <aeo-card>
      <template slot="header">binding v-model with value and input</template>
      <!-- <bind-model-input-test v-model="total"></bind-model-input-test> -->
      <p>子组件的 <code>input</code> 事件的值会更新到 <code>v-model</code> 绑定的父组件</p>
      <p>子组件:  <code>this.$emit('input',this.value)</code></p>
      <p>子组件:  <code>props: ['value']</code></p>
      <p>父组件:  <code>{{ this.code }}</code></p>
      <p>即这样一个具有双向绑定的 v-model 组件要满足下列两个要求:
        <ul>
          <li>接受一个 value prop</li>
          <li>在 value 更新时 emit input 事件</li>
        </ul>
      </p>
    </aeo-card>

    <aeo-card>
      <template slot="header">this</template>
      <p v-for="(item, index) in this" :key="index">
        <strong>{{index.match(/^\$/) ? index : index}}</strong>:
        {{showItem(item)}}
      </p> 
    </aeo-card>

  </article>
</template>

<script>
import AeoCard from '@v/view/components/common/Card'
import Vue from 'vue'

export default {
  name: 'vue-v-model',
  components: {
    'aeo-card': AeoCard
  },
  data: function() {
    return {
      model: "",
      total: 0,
      code: "<xxx v-model=\'something_in_parent\'></xxx>"
    }
  },
  filters: {
    date_filter: function(value) {
      const date = new Date(value)
      return date.getFullYear() + '-' + (1 + date.getMonth()) + '-' + date.getDate()
    }
  },
  methods: {
    handleClick: function(e) {
      console.log('click', e)
      this.click.push(e)
      if (this.click.length > 8) {
        this.click = []
        this.click.push(e)
      }
    },
    handleInput: function(v) {
      console.log(v)
      this.input += v.key
    },
    showItem(t) {
      let r
      try {
        r = JSON.stringify(t)
      } catch (e) {
        r = e
        console.log(t)
      } finally {
        return r ? r : 'can not stringify'
      }
    }
  },
  mounted() {
    console.log(this.$parent)
    console.log(this.$children)
  }
}
</script>

<style lang="scss" scoped>

</style>
