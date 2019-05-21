<template>
  <article :class='"alive-calendar big-picture-bk"' :style='bk'>
    <section class="statistics">
      <alive-statistics class="card" v-model="this.power"></alive-statistics>
      <alive-statistics class="card" v-model="this.power"></alive-statistics>
      <alive-statistics class="card" v-model="this.power"></alive-statistics>
      <alive-statistics class="card" v-model="this.power"></alive-statistics>
    </section>
    <section class="core">
      <alive-progress class="card" v-model="this.progress"></alive-progress>
      <alive-todo class="card" v-model="this.todo"></alive-todo>
      <alive-daily class="card" v-model="this.daily"></alive-daily>
    </section>
  </article>
</template>

<script>
import aliveProgress from './dashboard/progress'
import aliveDaily from './dashboard/daily'
import aliveTodo from './dashboard/todo'

import aliveStatistics from './analysis/statistics'

import request from '@/alive/utils/axios'
import { django } from '@/config'

export default {
  name: 'dashboard',
  components: {
    aliveProgress, aliveTodo, aliveDaily,
    aliveStatistics,
  },
  data() {
    return {
      title: 'Alive',
      
      progress: null,
      todo: null,
      daily: null,

      bk: null,

      power: null
    }
  },
  methods: {
    fetchData() {
      request.get('list/progress/').then(response => {
        this.progress = response.results
      })
      request.get('list/todo/').then(response => {
        this.todo = response.results
      })
      request.get('list/daily/').then(response => {
        this.daily = response.results
      })
      request.get('list/power/')
        .then(()=>{})
        .catch(()=> {
        })
        .finally(()=> {
          this.power = {
            number: 5,
          }    
        })
    },
    fetchBackground() {
      let vm = this
      import('../assets/pictures').then(bk => {
        vm.bk = "background-image: url(" + bk.default + ");"
      })
    }
  },
  created() {
    this.fetchData()
    this.fetchBackground()
  }

}
</script>

<style lang="scss" scoped>

.alive-calendar {
  height: 100%;
  margin: 50px 0px 0px 0px;
  padding-top: 300px;
  // padding-top: 40px;
  box-sizing: border-box;
}

section {
  display: flex;
  // width: 100vw;
  box-sizing: border-box;
  flex-wrap: nowrap;
  flex-direction: row;
  padding: 0px 80px 0px 80px;

  .card {
    box-sizing: border-box;
    margin: 4px;
    // width: 100%;
    flex-shrink: 1;
    flex-grow: 1;
  }
}

.statistics {
  .card {
    height: 100px;
    max-width: 50%;
  }
}
.core {
  .card {
    height: 300px;
  }
}

.big-picture-bk {
  min-height: 100vh;
  position: relative;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
// small
@media screen and (max-width: 1440px) {
  section {
    flex-wrap: wrap;
    .card {
      width: calc(50% - 8px);
      max-width: calc(50% - 8px);
    }
  }
  section.statistics {
    flex-wrap: wrap;
    .card {
      width: calc(50% - 8px);
    }
  }
} // small-end-
// half
@media screen and (max-width: 800px) {
  section {
    flex-wrap: wrap;
    .card {
      width: 100%;
    }
  }
  section.statistics {
    flex-wrap: wrap;
    .card {
      width: calc(50% - 8px);
    }
  }
} // half-end-
// mobile
@media screen and (max-width: 632px) {
  section {
    flex-wrap: wrap;
    .card {
      width: 100%;
    }
  }
  section.statistics {
    flex-wrap: wrap;
    .card {
      max-width: 100%;
      width: 100%;
    }
  }
} // half-mobile-

</style>


<style>

</style>
