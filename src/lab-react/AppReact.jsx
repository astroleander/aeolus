import React, { Component } from 'react'
import { HashRouter, Route, Link, Switch } from "react-router-dom";

import NavLayout from './layouts/NavLayout'
import CommonLayout from './layouts/CommonLayout';


/**
 * webpack 入口脚本会在最后执行, 观察 F12 文档结构即可确认。
 * 问题在于 scss, 在 react 中 scss 加载慢导致的样式异步问题特别严重, 可能是渲染周期导致的。
 * 比较麻烦的是我甚至不知道这个 scss 解析以后跑到哪里去了。
 * 还有一点，我也不知道 vue 上为什么没有这个问题。
 */
import '#res/styles/index.scss'
/**
 * 如果不在这里加载 main.css 
 * 那么在 config.global.js 中的 main.css 加载以后
 * 会导致 html 和 body 级别的重绘, 非常影响体验
 */
import '#res/main.css';
/**
 * 这个问题的核心是通过 js 入口脚本引入 scss 导致的，
 * 所以交换 chunk 顺序，先引入 config 脚本可以很大程度缓解这个问题
 * (但是根治不了)
 */
export default class AppReact extends Component {
  render() {
    return (
        <HashRouter>
          <Switch>
            <Route
              path='/views'
              component={CommonLayout}
            />
            <Route
              path=''
              component={NavLayout}
            >
            </Route>
          </Switch>
        </HashRouter>
    )
  }
}
