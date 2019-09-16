import React, { Component } from 'react'
import { HashRouter, Route, Link } from "react-router-dom";

import Routers from '@r/router/view';

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
    import('#res/definitions').then(module => {
      this.setState({nav: module.entries})
    })
  }

  render() {
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
        <header>
        </header>
        <HashRouter>
            {renderedRouter}
        </HashRouter>
      </article>
    )
  }
}