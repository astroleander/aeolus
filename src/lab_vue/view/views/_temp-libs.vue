<template>
  <article>
    <table>
      <tr v-for="({name, doc, url}, idx) of pair" :key="idx">
        <td>{{name}}</td>
        <td>{{doc}}</td>
        <td><a :href="url">{{url}}</a></td>
      </tr>
    </table>
  </article>
</template>

<script>
export default {
  data: function() {
    return {
      pair: [
        { name: 'scroll', doc: '', url: 'http://scrollmagic.io/examples/basic/class_toggles.html' },
        { name: 'ai', 
          doc: '人工智能-复杂问题求解的结构和策略GEL,\n' + 
          '神经网络原理 SimonH\n' + 
          '神经计算原理 FMH, 人工智能NJ Nilsson,\n' + 
          '机器学习TomM\n' + 
          'Prolog高级程序设计 The Art of Prolog' +
          'Mathematical Logic', 
          url: ''
        },
        { name: 'Django, selenium, jQuery, Mock'},
        { name: 'applying UML xxxx'}
      ]
    }
  }
}
</script>
