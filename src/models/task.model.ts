import { action, observable } from 'mobx';

export interface ITaskProps {
  completed: boolean;
  text: string;
  id: string;
}

export interface ITaskModel extends ITaskProps {
  toggle: () => void;
  update: (text: string) => void;
}

export class TaskModel implements ITaskModel {
  static fromObject(taskObject: ITaskProps) {
    return new TaskModel(taskObject.text, taskObject.completed, taskObject.id)
  }

  @observable
  completed: boolean;

  @observable
  text: string;

  id: string;

  toggle() {
    this.completed = !this.completed;
    console.log(this.completed);
  }

  @action
  update(newText: string) {
    this.text = newText;
  }

  constructor(text: string, completed: boolean = false, id: string = Date.now().toString()) {
    this.text = text;
    this.completed = completed;
    this.id = id;
  }
}