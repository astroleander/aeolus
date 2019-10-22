import React, { Component } from 'react'
import { HashRouter, Route, Link } from "react-router-dom";

import Routers from '@r/router/view';
import Functions from '@r/router/func';
import './styles/nav.scss'

import 'core-js'
import 'react-app-polyfill/stable';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      nav: null
    }
  }
  /* componentWillMount has been renamed */
  // async componentWillMount() {
    // let state = await import('#res/definitions.js');
    // this.setState({nav: state.entries})
  // }
  componentDidMount() {
    import('#res/definitions.js').then(module => {
      // 利用延时测试 skeleton
      // setTimeout(() => {this.setState({nav: module.entries})}, 500);
      this.setState({nav: module.entries})
    });
  }
  componentDidUpdate() {
  }
  render() {
    const nav = this.state.nav;
    const renderedViewRouter = Routers.map((item, idx) => {
      return (
        // add link here
        <Link key={`${idx}`} to={item.path}>
          <li>{item.name}</li>
        </Link>
      )
    })
    const renderedAlgoRouter = Functions.map((item, idx) => {
      return (
        <Link key={`${idx}`} to={{pathname: item.path}}>
          <li>{item.key}</li>
        </Link>
      )
    });
    return (
      <>
      {this.Navigation(nav)}
      <article id='react-dashboard' className="dashboard">
        <HashRouter>
          {renderedViewRouter}
        </HashRouter>
        <HashRouter>
          {renderedAlgoRouter}
        </HashRouter>
      </article>
      </>
    )
  }
  Navigation(list) {
    if (!list) 
      return NavigationSkeleton();
    console.log(this)
    return (<header className='global-navigation'>
      {list.map((element,idx) => 
        (<a key={idx} href={element.path}>{element.title}</a>)
      )}
      </header>)
  }
}

function NavigationSkeleton() {
  return (<header className='global-navigation-skeleton'>
    <a></a><a></a><a></a><a></a><a></a><a></a> 
  </header>)
}