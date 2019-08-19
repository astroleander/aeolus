<template>
  <article class="flex-container start-start" id="shape-sample">
    <div v-for="(shape, index) in shapeList"
     v-html="shape.outerHTML"
     :key="index">
    </div>
    <div class="matchwidth">
      <h1>border triangle & trapezoid</h1>
      <div id='controllable-triggle' class='shape controllable-triggle' :style='getControllableTriggle'></div>
      <div id="controller-triggle" class="flex-container row start-start">
        <div style="width:100%">
          <button @click='setTriAngle(60, 60, 60)'>Equilateral</button>
          <button @click='setTriAngle(75, 75, 30)'>Isosceles</button>
          <button @click='setTriAngle(90, 90, undefined)'>Right</button>
          <button @click='setTriAngle(45, 45, 90)'>Top Right</button>
          <button @click='setTriAngle(30, 30, 120)'>Obtuse</button>
          <button @click='setTriAngle(60, 50, 70)'>Acute</button>
        </div>
        <div style="padding:20px; width: 40%;" v-for="([style, value], idx) in Object.entries(controllableTriggle)" :key="idx">
          {{idx}}:{{style}}:{{value.toFixed(2)}}
          <el-slider v-model="controllableTriggle[`${style}`]"></el-slider>
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
#controllable-triggle.controllable-triggle {
  border-style: solid;
  border-top-color: #CCC;
  border-left-color: #EEE;
  border-right-color: #AAA;
  border-bottom-color: #FF7777;
}
</style>
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
  .square {
    margin: 10px;
    // square do not need any transform
  }
  .triangle {
    border-color: transparent;
    border: 100px solid transparent;
    border-bottom: 65px solid gray;
    border-top-width: 0px;
    border-left-width: 50px;
  }
  &.flex-container{
    align-content: flex-start;
  }
}
</style>

<script>
import { Slider } from 'element-ui'

export default {
  components: {
    'el-slider': Slider
  },
  data() {
    return {
      shapeList: [],
      controllableTriggle: {
        borderTopWidth: 50,
        borderBottomWidth: 50,
        borderLeftWidth: 50,
        borderRightWidth: 50,
      }
    }
  },
  mounted() {
    this.drawCircle({r: 50})
    this.drawSquare({w: 100})
    this.drawTriangle();
  },
  methods: {
    drawCircle({r = 50, cx = 0, cy = 0}) {
      const circle = CircleFactory.createCircle({r, cx, cy});
      console.log(circle.outerHTML)
      this.shapeList.push(circle)
    },
    drawSquare({w = 50, x = 0, y = 0}) {
      const square = QuadFactory.createSquare({w, x, y});
      console.log(square.outerHTML)
      this.shapeList.push(square)
    },
    drawTriangle() {
      const triangle = TriFactory.createTriangle();
      console.log(triangle.outerHTML)
      this.shapeList.push(triangle)
    },
    setTriAngle(A, B, C) {
      if (C > 90) {
        this.controllableTriggle.borderRightWidth = Math.random() * 100 ;
        this.controllableTriggle.borderLeftWidth = 100 - this.controllableTriggle.borderRightWidth;
        this.controllableTriggle.borderBottomWidth = Math.random() * 49;
        this.controllableTriggle.borderTopWidth = 100 - this.controllableTriggle.borderBottomWidth;
      }
      else if (A === 90 || B === 90) {
        this.controllableTriggle.borderBottomWidth = Math.random() * 100
        this.controllableTriggle.borderTopWidth = 100 - this.controllableTriggle.borderBottomWidth;
        if(Math.random() > 0.5 ) {
          this.controllableTriggle.borderRightWidth = 0;
          this.controllableTriggle.borderLeftWidth = 100;
        } else {
          this.controllableTriggle.borderRightWidth = 100;
          this.controllableTriggle.borderLeftWidth = 0;
        }
      } else if (A === 60 && B === A) {
        this.controllableTriggle.borderRightWidth = 50;
        this.controllableTriggle.borderLeftWidth = 50;
        this.controllableTriggle.borderBottomWidth = Math.tan(Math.PI / 180 * 60) * 50.0;
        this.controllableTriggle.borderTopWidth = 100 - this.controllableTriggle.borderBottomWidth;
      } else if (A === B) {
        this.controllableTriggle.borderRightWidth = 50;
        this.controllableTriggle.borderLeftWidth = 50;
        this.controllableTriggle.borderBottomWidth = Math.random() * 100
        this.controllableTriggle.borderTopWidth = 100 - this.controllableTriggle.borderBottomWidth;
      } 
    }
  },
  computed: {
    getControllableTriggle() {
      console.log('[getControllableTriggle] called');
      const newObjectSeq = Object.keys(this.controllableTriggle).reduce((res, key) => {
        res[key] = this.controllableTriggle[key] + 'px'
        return res
      }, {})
      console.log(newObjectSeq)
      return newObjectSeq
    }
  }
}
class ShapeFactory {
  static createShape(e, w=100, h=w) {
    e.style.width = `${w}px`;
    e.style.height = `${h}px`;
  }
}
class CircleFactory extends ShapeFactory {
  /**
   * @param {Object} default_params {r, cx, cy}
   */
  static createCircle({r = 50, cx = 0, cy = 0}) {
    const newElement = document.createElement('div')
    newElement.classList.add('circle', 'shape')
    super.createShape(newElement, r * 2, r * 2); // d = 2r
    return newElement
  }
}
class QuadFactory extends ShapeFactory {
  /**
   * @param {Object} default_params {w, h, x, y}
   */
  static createSquare({w, x=0, y=0}) {
    const newElement = document.createElement('div')
    newElement.classList.add('square', 'shape')
    super.createShape(newElement, w, w);
    return newElement
  }
}
class TriFactory extends ShapeFactory {
  /**
   *
   */
  static createTriangle() {
    const newElement = document.createElement('div')
    newElement.classList.add('triangle', 'shape')
    super.createShape(newElement)
    console.log(newElement.style.width)
    // 使用 js 编写 style 的时候不会遵循选择器优先顺序(因为你根本不在使用选择器，后来的会覆盖前面的)
    // newElement.style.border = '100px solid transparent'
    // newElement.style.borderBottom = `${newElement.style.width} solid gray`
    // newElement.style.borderTopWidth = '0px'
    return newElement
  }
}
</script>
