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
        {Navigation(nav)}
        <HashRouter>
            {renderedRouter}
        </HashRouter>
      </article>
    )
  }
}

function Navigation(list) {
  return NavigationSkeleton();
  console.log(list)
  return (<header className='global-navigation'>
    {list.map((element,idx) => 
      (<a key={idx} href={element.path}>{element.title}</a>)
    )}
    </header>)
}

function NavigationSkeleton() {
  return (<header className='global-navigation-skeleton'>
    <a></a>
  </header>)
}