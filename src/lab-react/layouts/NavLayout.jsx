import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom";

import Routers from '../router/view'

export default class NavLayout extends Component {
  constructor() {
    super();
    this.state = {
    }
  }
  componentDidMount() {
  
  }
  render() {
    const renderedRouter = Routers.map((item, idx) => {
      return (
        <li key={`${idx}`}>
            <Link to={`${item.path}`}>{item.name}</Link>
        </li>
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
    })
 
    return (
      <div>
        <BrowserRouter>
          <ul>
            {renderedRouter}
          </ul>
          <div></div>
          {renderedRoute}
          <Route
            path=''
            render={() => <h3>Please select d topic.</h3>}
          />          
          <Route
            path='/TodoApp'
            render={() => <h3>Please select a topic.</h3>}
          />
          <Route
            path='/lab-react'
            render={() => <h3>Please select b topic.</h3>}
          />
          <Route
            path='/lab-react/TodoApp'
            render={() => <h3>Please select c topic.</h3>}
          />

        </BrowserRouter>
      </div>
    )
  }
}