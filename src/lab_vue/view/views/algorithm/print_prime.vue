<template>
  <article>
    <div  v-for="(i1, idx) in i" :key="idx">
      {{i[idx]}} x {{j[idx]}} = {{result[idx]}}
    </div>
  </article>
</template>

<script>
import prime from '@lv/view/src/prime' 
export default {
  data() {
    return {
      i: [],
      j: [],
      result: []
    }
  },
  mounted() {
    for(let i = 0; i < prime.length; i++) {
      for(let j = 0; j < i; j++) {
        // if(prime[i] * prime[j] === 7140229933) {
        //   this.result = 7140229933
        //   this.i = prime[i]
        //   this.j = prime[j]
        // } 

        // let str = String(prime[i] * prime[j])
        // if(str.length > 10 && str.match('6541367')) {
        //   console.log(prime[i], prime[j], prime[i]*prime[j])
        // }
        
        let ret = prime[i] * prime[j]
        if( 6541367000 <ret && ret < 6541368000) {
          console.log(ret)
          this.result.push(ret)
          this.i.push(prime[i])
          this.j.push(prime[j])
        }
      }
    }
  }
}
</script>

<style>

</style>
