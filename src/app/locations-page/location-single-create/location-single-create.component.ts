import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {FormBuilding, LoadableComponent} from "../../../interfaces/component-interfaces";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {valueRequired} from "../../../util/form-control-validators";
import {getCombinedFormGroupValiditySubscription} from "../../../util/subscription-setup";
import {Observable, Subscription} from "rxjs";
import {LocationService} from "../../../services/HttpRequestSevices/location.service";
import {Location} from "../../../entities/Inventory";
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
              private locationService: LocationService) {
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
      this.locationService.createSingleLocation(locationDTO);
    } else { // update location
      locationDTO.locationId = this.location.locationId;
      locationDTO.warehouseId = this.location.warehouseId;
      this.locationService.updateLocation(locationDTO);
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
