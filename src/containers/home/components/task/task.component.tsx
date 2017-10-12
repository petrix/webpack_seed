import *  as React from 'react';
import { Component, SyntheticEvent } from 'react';
import { CheckboxComponent } from '../../../../components/checkbox/checkbox.component';
import { ITaskModel, TaskModel } from '../../../../models/task.model';

import './task.styl';
import { reaction } from 'mobx';
import { observer } from 'mobx-react';

interface ITaskComponentProps {
  task: ITaskModel;
  onDelete: (task: ITaskModel) => void;
}

interface ITaskComponentState {
  isEdit: boolean;
  text: string;
}

@observer
export class TaskComponent extends React.Component<ITaskComponentProps, ITaskComponentState> {
  private handleToggle() {
    this.props.task.toggle();
  }

  constructor() {
    super();
    this.state = {
      isEdit: false,
      text: ''
    }
  }

  componentDidMount() {
    this.setState((state) => {
      const newState = Object.assign({}, state)
      newState.text = this.props.task.text;
      return newState
    });
  }

  removeTask() {
    this.props.onDelete(this.props.task);
  }

  onChange(e: SyntheticEvent<HTMLInputElement>) {
    const newTitle = e.currentTarget.value;
    this.setState((prevState) => {
      const newState = Object.assign({}, prevState);
      newState.text = newTitle;
      console.log(newState);
      return newState
    })
  }

  updateText() {
    this.props.task.update(this.state.text);
  }

  onKeypress(e: KeyboardEvent) {
    if(e.charCode === 13) {
      this.updateText();
    }
  }

  render() {
    const {text, id, completed} = this.props.task;

    return (
      <div className="task" id={id}>
        <div className="task_checkbox">
          <CheckboxComponent isChecked={completed} onChange={this.handleToggle.bind(this)}/>
        </div>
        <div className="task_title">
          <input type="text" className="task_input"
                 onChange={this.onChange.bind(this)}
                 onBlur={this.updateText.bind(this)}
                 value={this.state.text}
                 onKeyPress={this.onKeypress.bind(this)}/>
          <span className="task_text">{text}</span>
        </div>
        <div className="task_controls" onClick={this.removeTask.bind(this)}>
          X
        </div>
      </div>
    )
  }
}