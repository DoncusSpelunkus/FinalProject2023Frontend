import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {FormBuilding, LoadableComponent} from "../../../interfaces/component-interfaces";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {valueRequired} from "../../../util/form-control-validators";
import {getCombinedFormGroupValiditySubscription} from "../../../util/subscription-setup";
import {Subscription} from "rxjs";
import {Location} from "../../../entities/Inventory";
import { Store } from '@ngxs/store';
import { createItem, updateItem } from 'src/app/states/inventory/product-actions';
import { EntityTypes } from 'src/constants/product-types';

@Component({
  selector: 'app-location-single-create',
  templateUrl: './location-single-create.component.html'
})
export class LocationSingleCreateComponent extends FormBuilding implements LoadableComponent, OnDestroy{

  isValidEmitter = new EventEmitter<boolean>();

  formGroup: FormGroup;
  private formGroupStateSubscription: Subscription;

  private location: Location;

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
    this.location = data;
    this.formGroup.patchValue({
      [FormControlNames.AISLE]: this.location.aisle,
      [FormControlNames.SHELF]: this.location.shelf,
      [FormControlNames.RACK]: this.location.rack,
      [FormControlNames.BIN]: this.location.bin,
    });
  }


  submit(): void {
    const locationDTO: Location = this.getDTO();
    if (!this.location) { //Create location
      this.store.dispatch(new createItem(locationDTO, EntityTypes[3]));
    } else { // update location
      locationDTO.locationId = this.location.locationId;
      locationDTO.warehouseId = this.location.warehouseId;
      this.store.dispatch(new updateItem(locationDTO, EntityTypes[3]));
    }
  }

  private initializeFormGroup() {
    this.formGroup = this.formBuilder.group({
      [FormControlNames.AISLE]: ['',valueRequired(FormControlNames.AISLE)],
      [FormControlNames.RACK]: ['',valueRequired(FormControlNames.RACK)],
      [FormControlNames.SHELF]: ['',valueRequired(FormControlNames.SHELF)],
      [FormControlNames.BIN]: ['',valueRequired(FormControlNames.BIN)],
    })
  }

  private initializeSubscriptions() {
    this.formGroupStateSubscription = getCombinedFormGroupValiditySubscription([this.formGroup],this.isValidEmitter);
  }

  private getDTO(): Location {
    return {
      aisle: this.formGroup.get(FormControlNames.AISLE).value,
      rack: this.formGroup.get(FormControlNames.RACK).value,
      shelf: this.formGroup.get(FormControlNames.SHELF).value,
      bin: this.formGroup.get(FormControlNames.BIN).value,
    }
  }

}
