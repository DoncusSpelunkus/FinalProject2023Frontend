import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormBuilding, LoadableComponent} from "../../../interfaces/component-interfaces";
import {MatSelectionListChange} from "@angular/material/list";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {valueRequired} from "../../../util/form-control-validators";

@Component({
  selector: 'app-receive-shipment',
  templateUrl: './receive-shipment.component.html'
})
export class ReceiveShipmentComponent extends FormBuilding implements LoadableComponent, OnInit{

  isValidEmitter = new EventEmitter<boolean>();

  formGroup: FormGroup;

  details: any[] = [
    'value1',
    'value2',
    'value3',
    'value4',
    'value5'
  ];
  productSKUs: any[] = [
    {value: '21-124'},
    {value: '21-gds'},
    {value: '21-12312'},
    {value: '21-FDSF-ewg'},
  ];

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  setData(data: any): void {
  }

  submit(): void {
  }

  onSelectionChange(event: MatSelectionListChange) {
    const selectedOptions = event.source.selectedOptions.selected;
    const selectedIndices = selectedOptions.map(option => option.value.index);

    console.log('Selected indices:', selectedIndices);
    // Now you can use selectedIndices to remove items from 'details'
  }

  private initializeFormGroup() {
    this.formGroup = this.formBuilder.group({
      [FormControlNames.QUANTITY]: ['', valueRequired(FormControlNames.QUANTITY)],
      [FormControlNames.SKU]: ['', valueRequired(FormControlNames.SKU)],
    })
  }
}
