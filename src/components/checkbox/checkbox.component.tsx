import * as React from "react";
import { Component } from 'react';

import './checkbox.styl';

interface ICheckboxComponentProps {
  onChange: () => void;
  isChecked: boolean;
  placeholder?: string;
}

interface ICheckoxComponentState {}

export class CheckboxComponent extends React.Component<ICheckboxComponentProps, ICheckoxComponentState> {
  render () {
    const inputId = String(Date.now());
    const {onChange} = this.props;
    return (
      <div className="checkbox">
        <label htmlFor={inputId}>
          <input id={inputId} type="checkbox" onChange={onChange}/>
          {this.props.placeholder}
        </label>
      </div>
    )
  }
}