<template>
  <article class="parallax">
    <div class="container background background-pic-1">
      <div class="title">
        FISHMAN PARALLAX DEMO
      </div>
    </div>
    <div class="container text-container">
      <div>
      background-attachment: fixed;<br/>
      background-position: center;<br/>
      background-repeat: no-repeat;<br/>
      background-size: cover;
      </div>
    </div>
    <div class="background background-pic-1"></div>
    <div class="background background-pic-3"></div>
  </article>
</template>

<script>
export default {
  name: 'parallax',
  data: function() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Libre+Barcode+128+Text');

.title {
  font-size: 5em;
  font-family: 'Libre Barcode 128 Text', cursive;
}

.parallax {
  min-height: 100vh;
}

.container {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.text-container {
  background: #333333;
  color: #EEE;

  font-size: 1.4em;
  font-weight: 100;
  font-family: 'consolas';
  line-height: 1.5em;

  padding: 40px 0 60px 0;
}

.background {
  min-height: 100vh;
  position: relative;
  opacity: 0.65;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &.background-pic-1 {
    background-image: url('../../../assets/p_parallax_1.jpg')
  }
  &.background-pic-2 {
    background-image: url('../../../assets/p_parallax_2.jpg')
  }
  &.background-pic-3 {
    background-image: url('../../../assets/p_parallax_3.png')
  }

}
</style>
