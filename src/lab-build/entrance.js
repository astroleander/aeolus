console.log('[build][entrance.js]', 'entrance triggered')

import '@/modules/utils/general_bash'

import React from 'react';
import ReactDOM from 'react-dom';

import Vue from 'vue';
import VueApp from './VueApp' 

import ReactPage from './ReactApp';
const ReactApp = () => {
  return (
    <div>
      { <h1>ReactApp</h1> }
      <ReactPage />
    </div>
  );
};

// 没加运行时编译包的 vue 不能使用即时构建
new Vue({
  el: '#vue',
  render: (createElement) => createElement(
    'article',
    {
      attrs: {
        id: 'vue'
      }
    },
    [
      createElement(VueApp, {}),
      'I\'m vue main page'
    ]
  )
})

ReactDOM.render(<ReactApp />, document.getElementById('react'));