import React, { Component } from 'react'
import { HashRouter, Route, Link, Switch } from "react-router-dom";

import NavLayout from './layouts/NavLayout'
import CommonLayout from './layouts/CommonLayout';

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
