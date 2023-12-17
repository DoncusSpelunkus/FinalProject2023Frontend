import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {FormBuilding, LoadableComponent} from "../../../interfaces/component-interfaces";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {BrandService} from "../../../services/HttpRequestSevices/brand.service";
import {UserObservable} from "../../../services/HelperSevices/userObservable";
import {CreateBrandDTO} from "../../../entities/Brand";
import {FormControlNames} from "../../../constants/input-field-constants";
import {valueRequired} from "../../../util/form-control-validators";
import {getCombinedFormGroupValiditySubscription} from "../../../util/subscription-setup";
import {TypeService} from "../../../services/HttpRequestSevices/type.service";
import {CreateTypeDTO, Type} from "../../../entities/Inventory";

@Component({
  selector: 'app-create-type',
  templateUrl: './create-type.component.html'
})
export class CreateTypeComponent extends FormBuilding implements LoadableComponent, OnInit, OnDestroy{

  isValidEmitter = new EventEmitter<boolean>();

  formGroup: FormGroup
  private formGroupStateSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private typeService: TypeService,
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
    const createBrandDTO: CreateTypeDTO = this.getDTO();
    this.typeService.createBrand(createBrandDTO);
  }


  private initializeFormGroup() {
    this.formGroup = this.formBuilder.group({
      [FormControlNames.TYPE_NAME]: ['',valueRequired(FormControlNames.TYPE_NAME)]
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

  private getDTO(): CreateTypeDTO {
    return {
      Name: this.formGroup.get(FormControlNames.TYPE_NAME).value,
      WarehouseId: this.userObservable.getUserSynchronously().warehouseId
    }
  }
}
