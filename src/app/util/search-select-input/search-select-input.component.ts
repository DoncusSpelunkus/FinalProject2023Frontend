import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {getFormControl} from "../../../util/form-control-validators";
import {map, Observable, ReplaySubject, startWith} from "rxjs";

@Component({
  selector: 'app-search-select-input',
  templateUrl: './search-select-input.component.html'
})
export class SearchSelectInputComponent implements OnInit{
  @Output() iconClickEmitter = new EventEmitter<any>();

  @Input() inputFormControlName: string;
  @Input() inputFormGroup: FormGroup;
  @Input('list')
  set inputList(list: any[]) {
    this.filteredOptions.next(list);
    this.list = list
  }
  @Input() showLabel = true;
  @Input() placeholder: string;

  @Input() showIcon = false;

  @Input() displayValueProperty: string
  @Input() searchValueProperty: string

  private list: any[]

  searchControl = new FormControl();

  filteredOptions: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  isLoading: any;

  emitIconClickEvent() {
    this.iconClickEmitter.emit();
  }

  get getCurrentFormControl() {
    return getFormControl(this.inputFormControlName,this.inputFormGroup);
  }

  ngOnInit() {
    this.searchControl.valueChanges.subscribe(value => {
      this.changeLoadingWithTimeout(1000);
      this.filteredOptions.next(this.filter(value))
    });
  }

  private filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.list.filter(option => option[this.searchValueProperty].includes(filterValue));
  }

  private changeLoadingWithTimeout(duration: number) {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, duration);
  }
}
