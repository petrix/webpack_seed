import * as React from "react";
import { Component } from 'react';
import { observer } from 'mobx-react';

import { ButtonComponent } from '../../../../components/button/button.component';
import './form-add.styl';
import { InputComponent } from '../../../../components/input/Input.component';
import { action, observable, reaction } from 'mobx';

interface FormAddComponentProps {
  onSubmit: (text: string) => void;
}

interface IFormAddState {
  taskText: string
}

@observer
export class FormAddComponent extends Component<FormAddComponentProps, IFormAddState> {
  // private taskText: string = '';

  private updateState(text: string) {
    this.setState((prevState) => {
      const newState = Object.assign(prevState);
      newState.taskText = text;
      return newState;
    })
  }

  private submit() {
    if(this.state.taskText) {
      this.props.onSubmit(this.state.taskText);
      this.updateState('')
    }
  }

  private updateText(text: string) {
    this.updateState(text);
  }

  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.updateText = this.updateText.bind(this);
    this.state = {
      taskText: ''
    }
  }

  render() {
    return (
      <div className="form-add">
          <div className="form-control">
            <InputComponent
              placeholder="What should be done?"
              onSubmit={this.submit}
              onInput={this.updateText}
              value={this.state.taskText}
            />
          </div>
          <div className="form-control">
            <ButtonComponent
              classNames="submit"
              onClick={this.submit}
              placeholder="Add todo"/>
          </div>
      </div>
    );
  }
}