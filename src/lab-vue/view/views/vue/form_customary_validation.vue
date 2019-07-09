<template>
  <article class="flex-container column">
  <form 
    class="card"
    id='form'
    @submit="checkForm"
    action="http://localhost:8080/lab_vue/index.html#/app"
    method="get"
    novalidate="true"
  >
    <p v-if="errors.length">
      <b>Please correct the following error(s):</b>
      <ul>
        <!-- using a list to contain errors -->
        <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
      </ul>
    </p>

    <p>
      <label for="name">Name: </label>
      <input id="name" v-model="form.name" type="text" name="name"/>
    </p>

    <p>
      <label for="email">Email: </label>
      <input id="email" v-model="form.email" type="email" name="email"/>
    </p>

    <p>
      <label for="number">Number: </label>
      <input id="number" v-model.number="form.cost" type="number" name="number"/>
    </p>


     <p>
      <input type="submit" value="Submit">
    </p>
  </form>
  </article>
</template>

<script>
export default {
  data() {
    return {
      errors: [],
      form: {
        name: null,
        email: null,
        cost: ""
      }
    }
  },
  computed: {
    // 这是一个 vue 机制的特性， 空值会被转化为 ""，所以我们必须强制类型转换
    total: function() {
      return Number(this.form.cost)
    }
  },
  methods:{
    checkForm: function (e) {
      this.errors = [];

      if (!this.form.name) {
        this.errors.push('Name required.');
      }
      if (!this.form.email) {
        this.errors.push('Email required.');
      } else if (!this.validEmail(this.email)) {
        this.errors.push('Valid email required.');
      }
      if (this.total < 100) {
        this.errors.push('Total must be great than   100!');
      }


      if (!this.errors.length) {
        return true;
      }
      e.preventDefault();
    },
    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  },
  
}
</script>

<style>

</style>
