import {Component, EventEmitter, HostBinding, Output} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {User} from "../../../entities/User";
import {ShipmentService} from "../../../services/HttpRequestSevices/shipment.service";
import {BrandService} from "../../../services/HttpRequestSevices/brand.service";
import {Brand, CreateBrandDTO} from "../../../entities/Brand";

@Component({
  selector: 'app-delete-brand',
  templateUrl: './delete-brand.component.html'
})
export class DeleteBrandComponent implements LoadableComponent{

  @HostBinding('style.width') width = '100%'
  @HostBinding('style.width') height = '100%'

  @Output() isValidEmitter = new EventEmitter<boolean>();

  selectedBrand: Brand;
  constructor(private brandService: BrandService) {
  }

  setData(data: any): void {
    this.selectedBrand = data;
  }

  submit(): void {
    this.brandService.deleteBrand(2) //TODO fix
  }

  onCheckboxChange(event: any) {
    this.isValidEmitter.emit(event.checked);
  }

  get getBrandName() {
    return this.selectedBrand.Name
  }
}

