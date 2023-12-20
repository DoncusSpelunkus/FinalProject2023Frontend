import {Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {TypeService} from "../../../services/HttpRequestSevices/type.service";
import {Type} from "../../../entities/Inventory";

@Component({
  selector: 'app-delete-type',
  templateUrl: './delete-type.component.html'
})
export class DeleteTypeComponent implements LoadableComponent{

@HostBinding('style.width') width = '100%'
@HostBinding('style.width') height = '100%'

@Output() isValidEmitter = new EventEmitter<boolean>();

  selectedType: Type;
  constructor(private typeService: TypeService) {
  }

  setData(data: any): void {
    this.selectedType = data;
  }

  submit(): void {
    this.typeService.deleteType(this.selectedType.typeId)
  }

  onCheckboxChange(event: any) {
    this.isValidEmitter.emit(event.checked);
  }

  get getBrandName() {
    return this.selectedType.name
  }
}
