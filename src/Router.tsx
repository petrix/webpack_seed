import * as React from "react";
import { Component } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { AppContainer } from './containers/App.container';

export class AppRouter extends Component {
  render() {
    return (
      <HashRouter>
        <AppContainer/>
      </HashRouter>
    )
  }
}