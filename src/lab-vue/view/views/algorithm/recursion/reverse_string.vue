<template>
  <article>
    {{input}}
    {{output}}
  </article>
</template>

<script>
var reverseString = function(s) {
    const output = [];
    function recursionReverseString(i) {
      if (s[i+1]) recursionReverseString(i+1);
      output.push(s[i]);      
    }
    
    recursionReverseString(0)
    s = output
    return s
};

export default {
  data() {
    return {
      input: ['f','*','*','k','y','o','u'],
      output: []
    }
  },
  mounted() {
    this.output = reverseString(this.input)
  }
}
</script>

<style>

</style>
