import {Component, EventEmitter, OnDestroy} from '@angular/core';
import {FormBuilding, LoadableComponent} from "../../../interfaces/component-interfaces";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {Location} from "../../../entities/Inventory";
import {FormControlNames} from "../../../constants/input-field-constants";
import {valueRequired} from "../../../util/form-control-validators";
import {getCombinedFormGroupValiditySubscription} from "../../../util/subscription-setup";
import { Store } from '@ngxs/store';
import { createLocationBatch } from 'src/app/states/inventory/product-actions';

@Component({
  selector: 'app-location-batch-create',
  templateUrl: './location-batch-create.component.html'
})
export class LocationBatchCreateComponent extends FormBuilding implements LoadableComponent, OnDestroy{

  isValidEmitter = new EventEmitter<boolean>();

  formGroup: FormGroup;
  private formGroupStateSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private store: Store) {
    super();
    this.initializeFormGroup();
    this.initializeSubscriptions();
  }

  ngOnDestroy(): void {
    if (this.formGroupStateSubscription) {
      this.formGroupStateSubscription.unsubscribe();
    }
  }

  setData(data: any): void {
  }

  submit(): void {
    const locationDTO: Location = this.getDTO();
    this.store.dispatch(new createLocationBatch(locationDTO));
  }

  private initializeFormGroup() {
    this.formGroup = this.formBuilder.group({
      [FormControlNames.AISLE_COUNT]: ['',valueRequired(FormControlNames.AISLE_COUNT)],
      [FormControlNames.RACK_COUNT]: ['',valueRequired(FormControlNames.RACK_COUNT)],
      [FormControlNames.SHELF_COUNT]: ['',valueRequired(FormControlNames.SHELF_COUNT)],
      [FormControlNames.BIN_COUNT]: ['',valueRequired(FormControlNames.BIN_COUNT)],
    })
  }

  private initializeSubscriptions() {
    this.formGroupStateSubscription = getCombinedFormGroupValiditySubscription([this.formGroup],this.isValidEmitter);
  }

  private getDTO(): Location {
    return {
      aisle: this.formGroup.get(FormControlNames.AISLE_COUNT).value,
      rack: this.formGroup.get(FormControlNames.RACK_COUNT).value,
      shelf: this.formGroup.get(FormControlNames.SHELF_COUNT).value,
      bin: this.formGroup.get(FormControlNames.BIN_COUNT).value,
    }
  }

}
