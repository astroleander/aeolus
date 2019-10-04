# 运行
## 运行环境
> Node.js 8.6+

# 构建

```
npm install
npm run dev
```

# 项目结构 
本项目
```
Aeolus.src 项目本身是一个非脚手架搭建的 webpack 项目。
  |- lab-graphics // 可视化技术 前端骨架 显示与动画 
  |- lab-react    // 人如其名
  |- lab-vue      // 人如其名 残留了一些算法和 HTML 基础知识
  |- lab-build    // 网页打包和架构技术的实验页 现阶段只有 webpack
  |
  |- modules
  |    |- algo     // ECMAScript 算法包
  |    |- api      // 封装的 API, 理论上输出一个 Promise
  |    |- utils    // 工具包
  |    |    |- 工具函数...
  |
  |- res
       |- assets   // 静态资源文件
       |- libs     // 无法用 npm 导入的包
       |    |- vanta        // 一个基于 three.js 但是年久失修的库
       |- styles   // 所有的样式
       |    |- index.scss   // 通过入口引入其余scss
       |    |- ...
       |- definition.js // 项目约定的常量
       |- main.css
       |- prerender.css
       | * 解决 js 引入样式包的一种尝试
```

## lab-graphics
用于练习前端动画/显示/可视化技术所需要的相关技术。

这些技术应当尽可能在原生环境下能够运行，我们使用 Vue2.0 (和在可预计的未来的3.0) 来保持文件结构, 方便拆分。
> 这样做的好处是我们在一处文件可以浏览实现效果需要的全部代码, 尤其是在 CSS 和 SVG 效果中, 我们可以直接观察 HTML 文档结构, CSS 样式表, 对应操作它们的 JS, 同时 Vue 提供了单组件命名空间, 写起来轻松一点。

我们应当了解的基础技术: 
`Vue.this` `Vue.data` `Sass` `HTML5` `ECMAScript2015` `Classic CSS`
我们想要从这里学到:
`Three.js` `WebGL` `Canvas` `SVG` `CSS Tricks & Practice`

# 资源文件结构目录
## 主目录
```
Aeolus.src
  |- lab-...
  |    |- styles
  |    |    |- common.scss
  |    |- entrance js file
  |    |    | * 在这里初始化项目或者框架
  |    |    |- 独有的样式文件
  |
  |- res
       |- main.css
       |- prerender.css
       |- styles
            |- index.scss
            |- button-float.scss
            |- layout-flex.scss
            |- layout-grid.scss
```

## 外部文件
```
Aeolus
  |- config.global.js
  | * 加载全局脚本和样式, 是所有页面共用的第二个 entrance js 文件 
  |    |
  |    |- import '#res/styles/index.scss'
  |    | * 在这里是非常不好的，通常来说我们应该让 CSS 在 header 加载, 
  |    | * 但是 Webpack 默认注入 JS 文件在最后。
  |    | * 或许我该去搜一下 "best practice webpack style"
  |    |
  |    |- import global js bash
  |
  |- config.entries.js
  | * 一个经过测试, 但是考虑过后不予使用的 HTMLWebPackPlugins 生成组件
  | * 反正实质上我并没有减少什么代码量, 用了反而破坏 Webpack 结构
  |
  ... 
```

# 介绍
## 固有约定
### 路径解析


1. 文件名中的 `_`(下划线) 会在显示时被替换为空格，而中划线不会。
2. 文件名中 `.`(点) 会被识别为块包的标志或者文件名后缀。
## 风格选择
1. Graphics 中主要的重点在于关注图形渲染和显示技术，我们尽量避免直接使用 vue 技术来构建网页。我们只使用最基本的 vue 技术来构建容器。
