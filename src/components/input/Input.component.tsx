import * as React from "react";
import { Component, SyntheticEvent, KeyboardEvent} from 'react';
import { debounce } from '../../utils/utils';

import './input.styl';
import { observer } from 'mobx-react';
import { action } from 'mobx';

export interface IInputComponentProps {
  placeholder: string;
  onInput: (text: string) => void;
  onSubmit?: () => void;
  value: string;
}

interface IState {
  isActive: boolean;
}

@observer
export class InputComponent extends Component<IInputComponentProps, IState> {
  private nativeInput: HTMLInputElement|null;

  private setTextValue (text: string) {
    this.props.onInput(text);
  }

  private onInput(e: SyntheticEvent<HTMLInputElement>) {
    this.setTextValue(e.currentTarget.value);
  }

  private onKeyPress(e: KeyboardEvent<HTMLInputElement>) {
    if(e.charCode === 13) {
      this.props.onSubmit && this.props.onSubmit();
    }
  }

  constructor() {
    super();
    this.setTextValue = this.setTextValue.bind(this);
  }

  render() {
    let classNames = 'input ';

    if(this.props.value.length > 0) {
      classNames = classNames + ' active';
    }

    return (
      <div className={classNames}>
        <div className="input-label">{this.props.placeholder}</div>
        <input className="input-native-input"
               onKeyPress={this.onKeyPress.bind(this)}
               onInput={this.onInput.bind(this)}
               value={this.props.value}
               ref={(input) => { this.nativeInput = input; }}
               type="text"/>
        <div className="input-underline"> </div>
      </div>
    )
  }
}


