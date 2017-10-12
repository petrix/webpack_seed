import { action, observable } from 'mobx';
import { injectable } from 'inversify';

@injectable()
export class HomeStore {
  @observable
  isAddPanelShown: boolean = true;

  constructor() {
    console.log('Home store created');
  }

  @action
  toggleAddPanel() {
    this.isAddPanelShown = !this.isAddPanelShown;
    console.log( this.isAddPanelShown );
  }

}