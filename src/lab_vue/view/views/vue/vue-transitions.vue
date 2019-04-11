<template>
  <article class="flex-cols">
    <section>
      <img width="100%" src="https://cn.vuejs.org/images/transition.png"/>
    </section>
    <section></section>
    <transition
      appear
      appear-class='v-enter'
      appear-active-class="v-enter-active"
      >
      <div v-on:click="show = !show" 
              style="position: fixed; bottom: 20px; left: 20px;"
              class="floating-button">
              <p>★</p>
      </div>

    </transition>
    <section>
      <p>name: fade (active style will cover another styles)</p>span:
      <transition name="fade">
        <span v-if="show">hello</span>
      </transition>
    </section>
    <section>
      <p>no name, using default class</p>span:
      <transition>
        <span v-if="show">world</span>
      </transition>
    </section>
    <section>
      <p>slide effects</p>span:
      <transition name='slide-fade'>
        <span v-if="show">world</span>
      </transition>
    </section>
    <section>
      <p>bounce effects using <code>animation</code></p>span:
      <transition name='bounce'>
        <span v-if="show">world</span>
      </transition>   
    </section>
    <section>
      <p>customary transition class name (higher priority than <code>name</code>) </p>span:
      <transition
        name="bounce"
        enter-active-class="fade-enter-active"
        leave-active-class="fade-leave-active"
        enter-class="fade-enter"
        leave-to-class="fade-leave-to"
      >
        <span v-if="show">world</span>
      </transition>
    </section>
    <section>
      <p>using 
        <code>animation</code>and
        <code>transition</code> in same time,
        you need setting <code>type</code> to declear which event(animation or transition) you wanna vue listen to
      </p>span transition:(3s)
      <transition name='rotate' type="transition">
        <span v-if="show">world</span>
      </transition><br/>span animation:(0.8s)
      <transition name='rotate' type="animation">
        <span v-if="show">world</span>
      </transition>
    </section>
    <section>
      <p>Explicit Transition Durations</p>span:
      <transition name="fade" :duration="{ enter: 500, leave: 3000}">
        <span v-if="show">hello</span>
      </transition>
    </section>
    <section>
      <p>JavaScript Hooks<code>v-bind:css="false"</code></p>span:
      <!-- 使用 v-bind:css="false"，Vue 会跳过 CSS 的检测。 -->
      <!-- 这可以避免过渡过程中 CSS 的影响。 -->
      <transition name="fade"
        v-bind:css="false"
        v-on:before-enter="this.beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        v-on:enter-cancelled="enterCancelled"

        v-on:before-leave="beforeLeave"
        v-on:leave="leave"
        v-on:after-leave="afterLeave"
        v-on:leave-cancelled="leaveCancelled"
        >
        <span v-if="show">hello</span>
      </transition>
    </section>
    <section>
      <!-- 当有相同标签名的元素切换时，-->
      <!-- 需要通过 key 特性设置唯一的值来标记以让 Vue 区分它们，-->
      <!-- 否则 Vue 为了效率只会替换相同标签内部的内容。-->
      <!-- 即使在技术上没有必要，给在 <transition> 组件中的多个元素设置 key 是一个更好的实践。 -->
      <p>same tag and without key</p>span:
      <transition name='bounce'>
        <span v-if="show">world</span>
        <span v-else>hello</span>
      </transition>   
    </section>
    <section>
      <p>same tag with key</p>span:
      <transition name='bounce'>
        <span v-if="show" key="world">world</span>
        <span v-else key="hello">hello</span>
      </transition>   
    </section>
    <section>
      <p>same tag with key, set mode <code>out-in</code></p>span:
      <transition name='bounce' mode="out-in">
        <span v-if="show" key="world">world</span>
        <span v-else key="hello">hello</span>
      </transition>   
    </section>
    <section>
      <p>same tag with key, set mode <code>in-out</code></p>span:
      <transition name='bounce' mode="in-out">
        <span v-if="show" key="world">world</span>
        <span v-else key="hello">hello</span>
      </transition>   
    </section>
  </article>
</template>

<script>
export default {
  data() {
    return {
      show: true
    }
  },
  methods: {
    // --------
    // 进入中
    // --------
    beforeEnter: function (el) {
      console.log('[beforeEnter]', el)
      el.style.opacity = 0
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    //
    // 当只用 JavaScript 过渡的时候，
    // 在 enter 和 leave 中必须使用 done 进行回调。
    // 否则，它们将被同步调用，过渡会立即完成。
    enter: async function (el, done) {
      console.log('[enter]', el)
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
      }
      await sleep(2000)
      el.style.opacity = 1
      done()
    },
    afterEnter: function (el) {
      console.log('[afterEnter]', el)
    },
    enterCancelled: function (el) {
      console.log('[enterCancelled]', el)
    },

    // --------
    // 离开时
    // --------
    beforeLeave: function (el) {
      console.log('[beforeLeave]', el)
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    leave: function (el, done) {
      console.log('[leave]', el)
      done()
    },
    afterLeave: function (el) {
      console.log('[afterLeave]', el)
    },
    // leaveCancelled 只用于 v-show 中
    leaveCancelled: function (el) {
      console.log('[leaveCancelled]', el)
    }
  }
}
</script>

<style lang="scss" scoped>
/////////////////////////////////////////////////////////////

.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0.1;
}
.fade-enter {
  background: red
}
.fade-enter-active {
  background: #DF0
}
.fade-enter-to {
  background: repeating-linear-gradient(45deg, transparent 0, transparent 20px, #B00 20px, #B00 40px)
}
.fade-leave-to {
  background: repeating-linear-gradient(135deg, transparent 0, transparent 20px, #D70 20px, #D70 40px)
}
.fade-leave {
  background: #000
}
/////////////////////////////////////////////////////////////

.v-enter, .v-leave-to {
  opacity: 0;
}
.v-enter-active, .v-leave-active {
  transition: opacity 1.5s
}
/////////////////////////////////////////////////////////////

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
}
//////////////////////////////////////////////////////////////

.bounce-enter-active {
  animation: bounce-in .8s;
}

.bounce-leave-active {
  animation: bounce-in .8s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
////a////////////////////////////////////////////////////////
.rotate-enter-active {
  animation: rotate-in .8s;
  transition: opacity 3s;
}

.rotate-leave-active {
  animation: rotate-in .8s reverse;
  transition: opacity 3s;
}

.rotate-enter, .rotate-leave-to {
  opacity: 0;
}

@keyframes rotate-in {
  0% {
  }
  25% {
    transform: rotate(90deg);
  }
  100% {
  }
}
/////////////////////////////////////////////////////////////
span {
  display: inline-block;
  min-width: 200px;
}
p {
  font-weight:bold;
}

</style>
