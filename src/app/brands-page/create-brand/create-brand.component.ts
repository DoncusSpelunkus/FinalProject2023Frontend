import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {FormBuilding, LoadableComponent} from "../../../interfaces/component-interfaces";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {valueRequired} from "../../../util/form-control-validators";
import {getCombinedFormGroupValiditySubscription} from "../../../util/subscription-setup";
import {Subscription} from "rxjs";
import {BrandService} from "../../../services/HttpRequestSevices/brand.service";
import {CreateBrandDTO} from "../../../entities/Brand";
import {UserObservable} from "../../../services/HelperSevices/userObservable";

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html'
})
export class CreateBrandComponent extends FormBuilding implements LoadableComponent, OnInit, OnDestroy{

  isValidEmitter = new EventEmitter<boolean>();

  formGroup: FormGroup
  private formGroupStateSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private brandService: BrandService,
              private userObservable: UserObservable) {
    super();
  }

  ngOnInit(): void {
    this.initializeFormGroup();
    this.initializeSubscriptions();
  }

  setData(data: any): void {
  }

  submit(): void {
    const createBrandDTO: CreateBrandDTO = this.getDTO();
    this.brandService.createBrand(createBrandDTO);
  }


  private initializeFormGroup() {
    this.formGroup = this.formBuilder.group({
      [FormControlNames.BRAND_NAME]: ['',valueRequired(FormControlNames.BRAND_NAME)]
    })
  }

  private initializeSubscriptions() {
    this.formGroupStateSubscription = getCombinedFormGroupValiditySubscription([this.formGroup],this.isValidEmitter);
  }

  ngOnDestroy(): void {
    if (this.formGroupStateSubscription) {
      this.formGroupStateSubscription.unsubscribe();
    }
  }

  private getDTO(): CreateBrandDTO {
    return {
      Name: this.formGroup.get(FormControlNames.BRAND_NAME).value,
      WarehouseId: this.userObservable.getUserSynchronously().warehouseId
    }
  }
}
