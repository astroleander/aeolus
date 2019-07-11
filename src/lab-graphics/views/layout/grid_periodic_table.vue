<template>
  <article class="flex-container center fullscreen" :class="style">
    <canvas id="canvas" class="canvas"></canvas>
    <section id="periodic-table">
      <div v-for="(element, idx) in elements" :key="idx" 
        :col='element.xpos' :raw='element.ypos'
        class="element" :class="[element.phase]"
        :style="generateElementPos(element.xpos, element.ypos)"
      >
        {{element.symbol}}
        <span>{{Number(element.atomic_mass).toFixed(2)}}</span>
      </div>
    </section>
    <button class="floating-button" 
      @click="()=> { style==='light' ? style='dark': style='light'}"></button>
  </article>
</template>

<script>
export default {
  data() {
    return {
      elements: [],
      style: 'dark'
    }
  },
  mounted() {
    let ajax = new XMLHttpRequest()
    ajax.onload = (res) => {
      this.elements = JSON.parse(res.target.response).elements
    }
    ajax.open('GET', 'https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json')
    ajax.send()
    this.initCanvas()
    console.log('[supported] background canvas powerby codepen.io/giaco https://codepen.io/giaco/pen/RzERNL')
  },
  methods: {
    generateElementPos(x, y) {
      return {
        'grid-row-start': y,
        'grid-column-start': x
      }
    },
    initCanvas() {
      let canvas = document.getElementById("canvas")
      let ctx = canvas.getContext("2d");
      let cw = (canvas.width = window.innerWidth);
      let ch = (canvas.height = document.body.offsetHeight);
      let rid = null; // request animation id
      ctx.fillStyle = "hsla(0, 5%, 5%, .025)";

      class Particle {
        constructor() {
          this.pos = { x: Math.random() * cw, y: Math.random() * ch };
          this.vel = { x: 0, y: 0 };
          this.base = (1 + Math.random()) * 3;
          this.life = randomIntFromInterval(5, 20);
          this.color = Math.random() < .1 ? "hsla(200,90%,50%,1)" : "hsla(0,0%,30%,.7)"
          this.history = [];
        }

        update() {
          this.history.push({ x: this.pos.x, y: this.pos.y });
          this.pos.x += this.vel.x;
          this.pos.y += this.vel.y;
        }

        show() {
          this.life--;
          ctx.beginPath();
          let last = this.history.length - 1;
          ctx.moveTo(this.history[last].x, this.history[last].y);
          for (let i = last; i > 0; i--) {
            ctx.lineTo(this.history[i].x, this.history[i].y);
          }
          ctx.strokeStyle = this.color;
          ctx.stroke();

          if (this.history.length > this.life) this.history.splice(0, 1);
        }

        edges() {
          if (
            this.pos.x > cw ||
            this.pos.x < 0 ||
            this.pos.y > ch ||
            this.pos.y < 0
          ) {
            this.pos.y = Math.random() * ch;
            this.pos.x = Math.random() * cw;
            this.history.length = 0;
          }
          if (this.life <= 0) {
            this.pos.y = Math.random() * ch;
            this.pos.x = Math.random() * cw;
            this.life = randomIntFromInterval(5, 20);
            this.history.length = 0;
          }
        }

        follow() {
          let x = ~~(this.pos.x / size);
          let y = ~~(this.pos.y / size);
          let index = x + y * cols;

          let angle = flowField[index];

          this.vel.x = this.base * Math.cos(angle);
          this.vel.y = this.base * Math.sin(angle);
        }
      }

      let particles = [];

      let size = 15; //flow field cell size
      let rows = ~~(ch / size) + 2;
      let cols = ~~(cw / size) + 2;

      let flowField = [];

      function getAngle(x, y) {
        return (Math.cos(x * 0.01) + Math.cos(y * 0.01)) * Math.PI / 2;
      }

      function getFlowField(rows, cols) {
        for (let y = 0; y <= rows; y++) {
          for (let x = 0; x < cols; x++) {
            let index = x + y * cols;
            let a = getAngle(x * size, y * size);

            flowField[index] = a;
          }
        }
      }

      getFlowField(rows, cols);

      for (let i = 0; i < 1000; i++) {
        particles.push(new Particle());
      }

      function frame() {
        rid = requestAnimationFrame(frame);

        // ctx.fillRect(0, 0, cw, ch);

        particles.map(p => {
          p.follow();
          p.update();
          p.show();
          p.edges();
        });
      }

      function Init() {
        cw = canvas.width = window.innerWidth;
        ch = canvas.height = document.body.offsetHeight;
        
        ctx.fillStyle = "hsla(0, 5%, 5%, .025)";

        rows = ~~(ch / size) + 2;
        cols = ~~(cw / size) + 2;

        flowField = new Array(rows * cols);
        getFlowField(rows, cols);

        if (rid) {
          window.cancelAnimationFrame(rid);
          rid = null;
        }
        frame();
      }

      window.setTimeout(function() {
        Init();

        window.addEventListener("resize", Init, false);
      }, 15);


      function randomIntFromInterval(mn, mx) {
        return Math.floor(Math.random() * (mx - mn + 1) + mn);
      }

    }
  }
}
</script>

<style lang="scss" scoped>
#canvas {
  position: absolute;
  width: 100%;
  height: 100vh;
  // opacity: 0.1;
  z-index: 0;
}
#periodic-table {
  z-index: 1;
  display: grid;
  min-width: 80%;
  min-height: 800px;
  grid-template-rows: repeat(10, 1fr);
  grid-template-columns: repeat(18, 1fr);
}
.element {
  &:hover {
    transform: scale(1.2);
  }
  margin: 1px;
  padding: 2px;
  span {
    font-size: 0.5em;
  }
}

// style
article {
  transition: background 1s;
  .canvas {
    transition: background 1s;
  }
  .element {
    transition: background 1s, transform .4s;
  }
}
.light {
  .canvas {
    background: white;
  }
  .element {
    &:hover {
      box-shadow: #444 0px 0px 2px;
    }
    background: #EEE;
  }
}
.dark {
  .canvas {
    background: #444;
  }
  background: #444;
  .element
  {
    &:hover {
      box-shadow: #e2e2e2 0px 0px 2px;
    }
    background: #212121;
    color: #E2E2E2;
  }
}

.floating-button {
  right: 100px;
}

</style>
