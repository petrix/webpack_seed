import * as React from "react";
import { Component } from 'react';
import { observer } from 'mobx-react';
import { computed, reaction } from 'mobx';

import { DomainStore } from '../../stores/domain.store';
import { HomeStore } from './home.store'
import { HeaderComponent } from './components/header/header.component';

import './home.styl';
import { TaskComponent } from './components/task/task.component';
import { ITaskModel } from '../../models/task.model';

interface IHomeContainerProps {
  domainStore: DomainStore
}

@observer
export class HomeContainer extends Component<IHomeContainerProps> {
  private _homeStore: HomeStore = new HomeStore();

  private togglePanel() {
    this._homeStore.toggleAddPanel();
  }

  private onAddTask(text: string) {
    this.props.domainStore.addTask(text)
  }

  private removeTask(task: ITaskModel) {
    this.props.domainStore.deleteTask(task)
  }

  @computed
  private get isPanelShown() {
    return this._homeStore.isAddPanelShown
  }

  constructor() {
    super();
    reaction(() => this._homeStore.isAddPanelShown, (newVal) => {
      console.log(newVal);
    })
  }

  componentWillUnmount() {
    this.props.domainStore.logOut()
  }


  render() {
    console.log(this.props.domainStore);
    const taskList = this.props.domainStore.tasks.map((task: ITaskModel) => {
        return <TaskComponent key={task.id} task={task} onDelete={this.removeTask.bind(this)}/>
    });

    return (
        <div className="page-container home-page">
          <HeaderComponent
            userName={this.props.domainStore.userName}
            isPanelShown={this.isPanelShown}
            onToggleAddPanel={this.togglePanel.bind(this)}
            onAddTask={this.onAddTask.bind(this)}/>
          <main className="home-page_main">
            {taskList}
          </main>
        </div>
    );
  }
}