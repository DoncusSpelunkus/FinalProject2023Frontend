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

  selectedFormDetailIndices: any[];
  details: any[] = [
    'value1',
    'value2',
    'value3',
    'value4',
    'value5'
  ];
  productSKUs: any[] = []

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
    this.selectedFormDetailIndices = selectedOptions.map(option => option.value.index);

  }

  private initializeFormGroup() {
    this.formGroup = this.formBuilder.group({
      [FormControlNames.QUANTITY]: ['', valueRequired(FormControlNames.QUANTITY)],
      [FormControlNames.SKU]: ['', valueRequired(FormControlNames.SKU)],
    })
  }

  isSelectedIndicesEmpty = () => {
    return !this.selectedFormDetailIndices || this.selectedFormDetailIndices.length === 0
  }

  /**
   * Remove all details objects that are selected by sorting the ones that don't match an index
   *
   */
  handleDeleteDetailsClick() {
    const indicesSet = new Set(this.selectedFormDetailIndices);
    this.details = this.details.filter((_, index) => !indicesSet.has(index));
  }
}
