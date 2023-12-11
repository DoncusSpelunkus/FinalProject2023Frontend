import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilding, LoadableComponent} from "../../../../interfaces/component-interfaces";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormControlNames} from "../../../../constants/input-field-constants";
import {getControlErrorMessage, numberOnly, valueRequired} from "../../../../util/form-control-validators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-stock-product',
  templateUrl: './stock-product.component.html'
})
export class StockProductComponent extends FormBuilding implements LoadableComponent, OnInit, OnDestroy{

  @Output() isValidEmitter = new EventEmitter<any>;

  formGroup: FormGroup;

  private isFormValidSubscription: Subscription;

  constructor(private _formBuilder: FormBuilder) {
    super();
  }
  ngOnInit(): void {
    this.initializeFormGroups();
    this.initializeSubscriptions();
  }

  ngOnDestroy(): void {
    if (this.isFormValidSubscription) {
      this.isFormValidSubscription.unsubscribe();
    }
  }
  setData(data: any): void {
  }

  submit(): void {
    console.log(this.formGroup.value);
  }

  isLinear = false;

  private initializeFormGroups() {
    this.formGroup = this._formBuilder.group({
      [FormControlNames.SKU]: ['',valueRequired(FormControlNames.SKU)],
      [FormControlNames.AISLE]: ['',valueRequired(FormControlNames.AISLE)],
      [FormControlNames.COLUMN]: ['',valueRequired(FormControlNames.COLUMN)],
      [FormControlNames.ROW]: ['',valueRequired(FormControlNames.ROW)],
      [FormControlNames.SHELF]: ['',valueRequired(FormControlNames.SHELF)],
      [FormControlNames.QUANTITY]: ['',[valueRequired(FormControlNames.QUANTITY),numberOnly(FormControlNames.QUANTITY)]]
    })
  }

  private initializeSubscriptions() {
    this.isFormValidSubscription = this.formGroup.statusChanges.subscribe(status => {
      switch (status) {
        case "VALID":
          this.isValidEmitter.emit(true);
          break;
        case "DISABLED":
          this.isValidEmitter.emit(false);
          break;
        case "INVALID":
          this.isValidEmitter.emit(false);
          break;
        case "PENDING":
          this.isValidEmitter.emit(false);
          break;
      }
    })
  }


  list: any[] = [
    {value: 'value'},
    {value: 'valueq1'},
    {value: 'value21'},
    {value: 'idk'},
  ]

}
