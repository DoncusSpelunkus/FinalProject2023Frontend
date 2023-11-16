import {Component, HostBinding} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html'
})
export class CreateUserComponent implements LoadableComponent{

  // Does nothing so should be left empty
  setData(data: any): void {
  }


  @HostBinding('style.width') width = '100%'
  @HostBinding('style.width') height = '100%'
}
