import {Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {Brand} from "../../../entities/Brand";
import {BrandService} from "../../../services/HttpRequestSevices/brand.service";
import {TypeService} from "../../../services/HttpRequestSevices/type.service";

@Component({
  selector: 'app-delete-type',
  templateUrl: './delete-type.component.html',
  styleUrls: ['./delete-type.component.scss']
})
export class DeleteTypeComponent implements LoadableComponent{

@HostBinding('style.width') width = '100%'
@HostBinding('style.width') height = '100%'

@Output() isValidEmitter = new EventEmitter<boolean>();

  selectedBrand: Brand;
  constructor(private typeService: TypeService) {
  }

  setData(data: any): void {
    this.selectedBrand = data;
  }

  submit(): void {
    this.typeService.deleteBrand(2)
  }

  onCheckboxChange(event: any) {
    this.isValidEmitter.emit(event.checked);
  }

  get getBrandName() {
    console.error('need to get shipment object')
    return this.selectedBrand.Name
  }
}
