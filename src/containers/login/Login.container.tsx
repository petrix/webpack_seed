import * as React from "react";
import { Component } from 'react';
import { History } from 'history';
import { observer } from 'mobx-react';

import './login.styl';

import { DomainStore, IDomainStore } from '../../stores/domain.store';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

interface IProps {
  history: History;
  domainStore: DomainStore;
}

@observer
class LoginContainer extends Component<IProps> {
  private onFormSubmit(userName: string) {
    console.log(userName);
    this.props.domainStore.logIn(userName);
    this.props.history.push('/home');
  }

  constructor() {
    super();
  }

  render() {
    return (
      <div className="page-container login-page">
        <LoginFormComponent onSubmit={this.onFormSubmit.bind(this)} />
      </div>
    )
  }
}

export { LoginContainer };