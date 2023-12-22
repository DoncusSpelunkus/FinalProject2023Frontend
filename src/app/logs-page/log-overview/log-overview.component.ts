import {Component, EventEmitter} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";

@Component({
  selector: 'app-log-overview',
  templateUrl: './log-overview.component.html'
})
export class LogOverviewComponent implements LoadableComponent{

  isValidEmitter: EventEmitter<boolean>;

  setData(data: any): void {
  }

  submit(): void {
  }

}
