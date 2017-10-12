import { observable, action, computed, IObservableArray, reaction, autorun } from 'mobx';
import { injectable } from 'inversify';
import { ITaskModel, TaskModel, ITaskProps } from '../models/task.model';
import { ObservableArray } from 'mobx/lib/types/observablearray';

export enum Filters {
  'ALL', 'ACTIVE', 'COMPLETED'
}

export interface IDomainStore {
  userName: string;
  filter: Filters;
  tasks: Array<ITaskModel>;
  logIn: (userName: string) => void;
  addTask: (text: string) => void;
  setFilter: (filter: Filters) => void;
  logOut: () => void;
}

@injectable()
export class DomainStore implements IDomainStore {
  @observable
  private _userName: string;

  @observable
  private _tasks = observable<ITaskModel>([]);

  @observable
  private _filter: Filters = Filters.ALL;

  @computed
  get userName(): string {
    return this._userName
  }

  @computed
  get tasks(): Array<ITaskModel> {
    return this.filterTasks();
  }

  @computed
  get filter(): Filters {
    return this._filter;
  }

  @action
  setFilter(filter: Filters) {
    this._filter = filter;
  }

  @action
  logIn(userName: string): void {
    this._userName = userName;
    this.getUserTasks();
  }

  @action
  addTask(text: string) {
    const newTask = new TaskModel(text);
    this._tasks.push(newTask);
  }

  @action
  deleteTask(task: ITaskModel) {
    this._tasks.remove(task);
  }

  @action
  logOut() {
    this._userName = '';
    this._tasks.replace([]);
  }

  constructor(){
    this.subscribeForStorageUpdate();
  }

  @action
  private getUserTasks() {
    const tasksFormStorage = JSON.parse(window.localStorage.getItem(`tasks.${this._userName}`)!) || [];
    const userTasks = tasksFormStorage.map((item: ITaskProps) => {
      return TaskModel.fromObject(item);
    });

    this._tasks.replace(userTasks);
  }

  private subscribeForStorageUpdate() {
    autorun( () => {
      console.log('Updated');
      window.localStorage.setItem(`tasks.${this._userName}`, JSON.stringify(this._tasks));
    });
  }

  private filterTasks(): Array<ITaskModel> {
    switch (this._filter) {
      case Filters.ACTIVE:
        return this._tasks.filter((task: ITaskModel) => {
          return !task.completed;
        });

      case Filters.COMPLETED:
        return this._tasks.filter((task: ITaskModel) => {
          return task.completed;
        });

      default:
        return this._tasks;
    }
  }
}