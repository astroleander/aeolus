<template>
  <article>
    <aeo-card>
      <template slot="header">v-html</template>
      <p v-html="this['v-html']"></p>
      <p><code>{{this['v-html']}}</code></p>
      <p>not working with brackets</p>
    </aeo-card>

    <aeo-card>
      <template slot="header">v-pre</template>
      <p v-html="this['v-pre']"></p>
      <p><code>{{this['v-pre']}}</code></p>
    </aeo-card>

    <aeo-card>
      <template slot="header">| (filter)</template>
      <p v-html="this['date']"></p>
      <p>{{this['date'] | date_filter}}</p>
      <p><code v-pre>{{this['date'] | date_filter}}</code></p>
    </aeo-card>

    <aeo-card>
      <template slot="header">event decorator</template>
      <div @click="handleClick('container')">
      <p>{{this['click']}}</p>
      <p><button @click="handleClick">@click</button></p>
      <p><button @click="(function(e) {handleClick(e)})()">@click anonymous function</button></p>
      <p><button @click="(e)=>{handleClick(e)}">@click arrow function</button></p>
      <p><button @click.stop="handleClick('stop')">@click.stop</button></p>
      <form><p><button @submit="handleClick('no-prevent')">@submit</button></p></form>
      <form><p><button @submit.prevent="handleClick('prevent')">@submit.prevent</button></p></form>
      <p><button @click.capture="handleClick">@click.capture</button></p>
      <p><button @click.once="handleClick">@click.once</button></p>
      </div>
    </aeo-card>

    <aeo-card>
      <template slot="header">event decorator - self</template>
      <div @click.self="handleClick('container')">
        <p>{{this['click']}}</p>
        <p><button @click="handleClick">@click</button></p>    
        <p><button @click.capture="handleClick">@click.capture</button></p>
        <p><button @click.once="handleClick">@click.once</button></p>    
      </div>
    </aeo-card>

    <aeo-card>
      <template slot="header">key listener</template>
      <p>{{this['input']}}</p>
      <p>@keyup<input @keyup="handleInput"/></p>
      <p>@keyup.S<input @keyup.S="handleInput"/></p>
      <p>@keyup.a<input @keyup.a="handleInput"/></p>
      <p>@keyup.shift.83<input @keyup.shift.83="handleInput"/></p>
      <p>the key event can not cover the global key event like ctrl+S</p>
      <p>@keyup.ctrl.83<input @keyup.ctrl.83="handleInput"/></p>
      <p>@keyup.ctrl.46<input @keyup.ctrl.46="handleInput"/></p>
      <p>notify that the response body of click is not as key event </p>
      <p>@click.ctrl<input @click.ctrl="handleInput"/></p>
    </aeo-card>

    <aeo-card>
      <template slot="header">v-model decorator</template>
      <p>{{ model }}</p>
      <p>v-model <input v-model="model"/></p>
      <p>v-model.lazy <input v-model.lazy="model"/></p>
      <p>v-model.number <input type='number' v-model.number="model"/></p>
      <p>v-model.trim <input type='number' v-model.trim="model"/></p>
    </aeo-card>
  </article>
</template>

<script>
import AeoCard from '@lv/view/components/common/Card'

export default {
  name: 'vue-guide',
  components: {
    'aeo-card': AeoCard
  },
  data: function() {
    return {
      'v-html': '<a href="#">{{an a-tag made by v-html}}</a>',
      'v-pre': '<span v-pre>{{ using v-pre to avoid compile bracket }}</span>',
      model: "",
      date: new Date(),
      click: [],
      input: ""
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
      if (this.click.length > 8) {
        this.click.shift(0)
      }
      this.click.push(e)
    },
    handleInput: function(v) {
      console.log(v)
      this.input += v.key
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
