import {Component, EventEmitter, OnDestroy} from '@angular/core';
import {FormBuilding, LoadableComponent} from "../../../interfaces/component-interfaces";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {valueRequired} from "../../../util/form-control-validators";
import {getCombinedFormGroupValiditySubscription} from "../../../util/subscription-setup";
import {Subscription} from "rxjs";
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
  }

  submit(): void {
    const locationDTO: Location = this.getDTO();
    this.locationService.createSingleLocation(locationDTO);
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
      Aisle: this.formGroup.get(FormControlNames.AISLE).value,
      Rack: this.formGroup.get(FormControlNames.RACK).value,
      Shelf: this.formGroup.get(FormControlNames.SHELF).value,
      Bin: this.formGroup.get(FormControlNames.BIN).value,
    }
  }
}
