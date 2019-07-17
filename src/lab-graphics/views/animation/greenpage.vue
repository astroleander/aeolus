<template>
    <article class="fullscreen" :style="'background:' + background">

    </article>
</template>

<script>
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            background: '#8bc34a'
        }
    },
    mounted() {
        transitionBackground.apply(this)
    },
}

function transitionBackground() {
    setTimeout(() => {
        this.background = '#FFF'
    }, 2000) 
}
</script>

<style lang="scss" scoped>
article {
    transition: background-color 1s
}
</style>


<style>

</style>
