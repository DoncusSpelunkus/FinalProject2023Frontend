import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilding, LoadableComponent} from "../../../interfaces/component-interfaces";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {valueRequired} from "../../../util/form-control-validators";
import {getCombinedFormGroupValiditySubscription} from "../../../util/subscription-setup";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html'
})
export class CreateProductComponent extends FormBuilding implements LoadableComponent, OnInit, OnDestroy{

  @Output() isValidEmitter = new EventEmitter<any>;

  productInfoFormGroup: FormGroup;

  productStorageInfoFormGroup: FormGroup;

  supplierInfoFormGroup: FormGroup;
  private formGroupStatusSubscription: Subscription;

  constructor(private _formBuilder: FormBuilder) {
    super();
  }
  ngOnInit(): void {
    this.initializeFormGroups();
    this.initializeSubscriptions();
  }

  setData(data: any): void {
  }
  submit(): void {
  }

  isLinear = false;
  private initializeFormGroups() {
    this.productInfoFormGroup = this._formBuilder.group({
      [FormControlNames.SKU]: ['',valueRequired(FormControlNames.SKU)],
      [FormControlNames.NAME]: ['',valueRequired(FormControlNames.NAME)],
      [FormControlNames.DESCRIPTION]: ['',valueRequired(FormControlNames.DESCRIPTION)],
      [FormControlNames.CATEGORY]: ['',valueRequired(FormControlNames.CATEGORY)],
      [FormControlNames.BRAND]: ['',valueRequired(FormControlNames.BRAND)],
      [FormControlNames.TYPE]: ['',valueRequired(FormControlNames.TYPE)]
    })

    this.productStorageInfoFormGroup = this._formBuilder.group({
      [FormControlNames.EXPIRY_DATE]: ['',valueRequired(FormControlNames.EXPIRY_DATE)],
      [FormControlNames.MINIMUM_CAPACITY]: ['',valueRequired(FormControlNames.MINIMUM_CAPACITY)],
      [FormControlNames.WIDTH]: ['',valueRequired(FormControlNames.WIDTH)],
      [FormControlNames.WEIGHT]: ['',valueRequired(FormControlNames.WEIGHT)],
      [FormControlNames.LENGTH]: ['',valueRequired(FormControlNames.LENGTH)],
      [FormControlNames.HEIGHT]: ['',valueRequired(FormControlNames.HEIGHT)]
    })

    this.supplierInfoFormGroup = this._formBuilder.group({
      [FormControlNames.SUPPLIER_NAME]: ['',valueRequired(FormControlNames.SUPPLIER_NAME)],
      [FormControlNames.SUPPLIER_CONTACT]: ['',valueRequired(FormControlNames.SUPPLIER_CONTACT)]
    })
  }

  handleOpenCreateTypeDialog() {
    console.log('create type')
  }

  handleOpenCreateBrandDialog() {
    console.log('create brand')
  }

  brandList: any[] = [
    {value: 'bmw'},
    {value:'caca'}
  ];

  private initializeSubscriptions() {
    this.formGroupStatusSubscription = getCombinedFormGroupValiditySubscription([this.productStorageInfoFormGroup,this.supplierInfoFormGroup,this.productInfoFormGroup],this.isValidEmitter)
  }

  ngOnDestroy(): void {
    if (this.formGroupStatusSubscription) {
      this.formGroupStatusSubscription.unsubscribe();
    }
  }
}
