import React, { Component } from 'react'
import { BrowserRouter, Route, Link } from "react-router-dom";

import NavLayout from './layouts/NavLayout'

export default class Navigation extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route
            exact
            path='/lab-react'
            component={NavLayout}
          >
          </Route>
        </BrowserRouter>
      </div>
    )
  }
}
