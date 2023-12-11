import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {getFormControl} from "../../../util/form-control-validators";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-search-select-input',
  templateUrl: './search-select-input.component.html'
})
export class SearchSelectInputComponent implements OnInit{
  @Output() iconClickEmitter = new EventEmitter<any>();

  @Input() inputFormControlName: string;
  @Input() inputFormGroup: FormGroup;
  @Input() list: any[]
  @Input() showLabel = true;
  @Input() placeholder: string;

  @Input() showIcon = false;

  @Input() displayValue: string

  searchControl = new FormControl();
  filteredList: any[];

  filteredOptions: Observable<any[]>;

  emitIconClickEvent() {
    this.iconClickEmitter.emit();
  }

  get getCurrentFormControl() {
    return getFormControl(this.inputFormControlName,this.inputFormGroup);
  }

  ngOnInit() {
    this.filteredList = this.list;
    this.searchControl.valueChanges.subscribe(value => {
      this.filteredList = this._filter(value);
    });
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.list.filter(option => option.includes(filterValue));
  }
}
