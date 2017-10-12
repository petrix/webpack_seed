import * as React from "react";
import { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { LoginContainer } from './login/Login.container';
import { HomeContainer } from './home/home.component';
import { DomainStore } from '../stores/domain.store';

export class AppContainer extends Component {
  private _domainStore: DomainStore = new DomainStore();

  render() {
    const {_domainStore} = this;
    const isLogged = !!this._domainStore.userName;
    return (
      <Switch>
        <Route exact path='/' render={
          ({...props}) => <LoginContainer domainStore={_domainStore} {...props}/>}/>}/>
        <Route path='/home' render={({...props}) => {
          if (isLogged) {
            return <HomeContainer domainStore={_domainStore} {...props}/>
          }
          return <Redirect to={{
            pathname: '/'
          }}/>
        }
        }/>
      </Switch>
    )
  }
}