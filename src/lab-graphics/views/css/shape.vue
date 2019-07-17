<template>
  <article class="flex-container col" id="shape-sample">
    <div v-for="(shape, index) in shapeList"
     v-html="shape.outerHTML"
     :key="index">
    </div>
  </article>
</template>

<script>
export default {
  data() {
    return {
      shapeList: []
    }
  },
  mounted() {
    this.drawCircle()
  },
  methods: {
    drawCircle() {
      const circle = CircleFactory.createCircle({r:50, cx:200, cy:400})
      console.log(circle.outerHTML)
      this.shapeList.push(circle)
    }
  }
}

class CircleFactory {
  /**
   * @param {Object} default_params {r, cx, cy} 
   */
  static createCircle({r, cx, cy}) {
    const newElement = document.createElement('div')
    newElement.classList.add('circle', 'shape')
    return newElement
  }
}
class Circle {
  constructor({r, cx, cy}) {
    this.r = r
    this.cx = cy
    this.cy = cy
  }
}
</script>

<style lang="scss">
#shape-sample {
  .shape {
    background: #FB3;
    margin: 10px;
    width: 100px;
    height: 100px;
    outline: 1px dashed red;
    border: 1px dashed gray;
}
  .circle {
    border-radius: 50%;
  }
  &.flex-container{
    align-content: flex-start;
  }
}

</style>
