import * as React from "react";
import { Component } from 'react';
import { observer } from 'mobx-react';

import './header.styl';
import { ButtonComponent } from '../../../../components/button/button.component';
import { FormAddComponent } from '../form-add/form-add.component';

interface IHomeComponentProps {
  onToggleAddPanel: () => void;
  onAddTask: (text: string) => void;
  isPanelShown: boolean;
  userName: string;
}

@observer
export class HeaderComponent extends Component<IHomeComponentProps> {

  private toggleAddPanel() {
    this.props.onToggleAddPanel()
  }

  private addTodo(text: string) {
    this.props.onAddTask(text)
  }

  constructor() {
    super();
    this.addTodo = this.addTodo.bind(this);
    this.toggleAddPanel = this.toggleAddPanel.bind(this);
  }

  render() {
    let placeholder = 'add task';
    let formComponent;

    if(this.props.isPanelShown) {
      placeholder = 'close';
      formComponent =  <FormAddComponent onSubmit={this.addTodo}/>
    }
    return (
        <header className="header grid-container">
          <div className="add-task-panel">
            <div className="add-task-form-wrapper">
              {formComponent}
            </div>
            <div className="add-task-panel_toggle-btn">
              <span className="header_user-name">Welcome, {this.props.userName}</span>
              <ButtonComponent onClick={this.toggleAddPanel} placeholder={placeholder}/>
            </div>
          </div>
        </header>
    );
  }
}