import React, { Component } from 'react'
import { HashRouter, Route, Link } from "react-router-dom";

import Routers from '@r/router/view';

import './styles/nav.scss'

// import 'core-js'
// import 'react-app-polyfill/stable';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      nav: null
    }
  }
  componentDidMount() {
    import('#res/definitions.js').then(module => {
      // 利用延时测试 skeleton
      // setTimeout(() => {this.setState({nav: module.entries})}, 500);
      this.setState({nav: module.entries})
    })        
  }
  componentDidUpdate() {
  }
  render() {
    const nav = this.state.nav;
    const renderedRouter = Routers.map((item, idx) => {
      return (
        // add link here
        <Link key={`${idx}`} to={item.path}>
          <li>{item.name}</li>
        </Link>
      )
    })
    const renderedRoute = Routers.map((item, idx) => {
      return (
        <Route
          key={idx}
          path={item.path}
          render={() => <h3>Please select {item.name} topic.</h3>}
        />   
      )
    });
    return (
      <article id='react-dashboard' className="dashboard">
        {this.Navigation(nav)}
        <HashRouter>
            {renderedRouter}
        </HashRouter>
      </article>
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