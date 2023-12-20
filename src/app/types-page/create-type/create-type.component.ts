import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {FormBuilding, LoadableComponent} from "../../../interfaces/component-interfaces";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {FormControlNames} from "../../../constants/input-field-constants";
import {valueRequired} from "../../../util/form-control-validators";
import {getCombinedFormGroupValiditySubscription} from "../../../util/subscription-setup";
import {TypeService} from "../../../services/HttpRequestSevices/type.service";
import {CreateTypeDTO} from "../../../entities/Inventory";

@Component({
  selector: 'app-create-type',
  templateUrl: './create-type.component.html'
})
export class CreateTypeComponent extends FormBuilding implements LoadableComponent, OnInit, OnDestroy{

  isValidEmitter = new EventEmitter<boolean>();

  formGroup: FormGroup
  private formGroupStateSubscription: Subscription;

  type: Type

  constructor(private formBuilder: FormBuilder,
              private typeService: TypeService) {
    super();
  }

  ngOnInit(): void {
    this.initializeFormGroup();
    this.initializeSubscriptions();
  }

  setData(data: any): void {
    this.type = data;
  }

  submit(): void {
    const createBrandDTO: CreateTypeDTO = this.getDTO();
    let editableType = { ...this.type };
    if (!this.type) {
      this.typeService.createType(createBrandDTO);
    } else {
      editableType.name = createBrandDTO.Name;
      this.typeService.updateType(editableType);
    }
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
    }
  }
}
