<template>
  <article class="flex-middle">
  <form 
    class="card"
    id='form'
    @submit="checkForm"
    action="http://localhost:8080/lab_vue/index.html#/app"
    method="get"
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
        email: null
      }
    }
  },
  methods:{
    checkForm: function (e) {
      if (this.form.name && this.form.email) {
        return true;
      }

      this.errors = [];

      if (!this.form.name) {
        this.errors.push('Name required.');
      }
      if (!this.form.email) {
        this.errors.push('Email required.');
      }
      e.preventDefault();
    }
  }
}
</script>

<style>

</style>
