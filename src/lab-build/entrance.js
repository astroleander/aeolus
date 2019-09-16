console.log('[build][entrance.js]', 'entrance triggered')

// build 的 entries 里不包括其它任何 entry，需要手动引入全局 config 包
import '@/modules/utils/global-bash'

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