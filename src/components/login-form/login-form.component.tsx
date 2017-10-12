import * as React from "react";
import { Component } from 'react';
import { History } from 'history';
import { observer } from 'mobx-react';

import './login-form.styl';

import { InputComponent } from '../input/Input.component';
import { ButtonComponent } from '../button/button.component';
import { observable } from 'mobx';

interface IProps {
  onSubmit: (userName: string) => void
}

interface IState {
  isValid: boolean
}

@observer
class LoginFormComponent extends Component<IProps, IState> {
  @observable
  private _userName: string = '';

  private setValidationState(isValid: boolean) {
    this.setState((prevState) => {
      const newState = Object.assign(prevState);
      newState.isValid = isValid;
      return newState;
    })
  }

  private validate() {
    this.setValidationState(!!this._userName.length);
  }

  private onFormSubmit() {
    this.validate();

    if (this.state.isValid) {
      console.log(this._userName);
      this.props.onSubmit(this._userName);
    }
  }

  private onInputChanged(userName: string) {
    this._userName = userName;
    this.setValidationState(true);
  }

  constructor() {
    super();
    this.state = {
      isValid: true,
    }
  }

  render() {
    const placeholder = 'Log In';
    let classNames = 'login-form';

    if(!this.state.isValid) {
      classNames += ' login-form__not-valid'
    }
    return (
      <div className={classNames}>
        <h1 className="login-form-header">Please login</h1>
        <div className="input-group">
          <InputComponent
            onInput={this.onInputChanged.bind(this)}
            onSubmit={this.onFormSubmit.bind(this)}
            value={this._userName}
            placeholder="Name"/>
        </div>
        <div className="input-group">
          <ButtonComponent
            classNames="danger"
            placeholder={placeholder}
            onClick={this.onFormSubmit.bind(this)}/>
        </div>
      </div>
    )
  }
}

export { LoginFormComponent };