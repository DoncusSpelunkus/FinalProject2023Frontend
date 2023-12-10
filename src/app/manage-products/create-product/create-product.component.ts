import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilding, LoadableComponent} from "../../../interfaces/component-interfaces";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {valueRequired} from "../../../util/form-control-validators";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html'
})
export class CreateProductComponent extends FormBuilding implements LoadableComponent, OnInit{

  @Output() isValidEmitter = new EventEmitter<any>;

  productInfoFormGroup: FormGroup;

  productDimensionsFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    super();
  }
  ngOnInit(): void {
    this.initializeFormGroups();
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

    this.productDimensionsFormGroup = this._formBuilder.group({
      [FormControlNames.SKU]: ['',valueRequired(FormControlNames.SKU)]
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
}
