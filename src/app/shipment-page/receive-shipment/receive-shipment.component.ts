import {Component, EventEmitter} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";

@Component({
  selector: 'app-receive-shipment',
  templateUrl: './receive-shipment.component.html'
})
export class ReceiveShipmentComponent implements LoadableComponent{

  isValidEmitter = new EventEmitter<boolean>();

  details: any[] = [
    'value1',
    'value2',
    'value3',
    'value4',
    'value5'
  ];

  setData(data: any): void {
  }

  submit(): void {
  }

}
