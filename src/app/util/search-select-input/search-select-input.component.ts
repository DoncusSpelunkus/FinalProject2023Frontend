import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {getFormControl} from "../../../util/form-control-validators";
import {map, Observable, ReplaySubject, startWith} from "rxjs";
import {FormBuilding} from "../../../interfaces/component-interfaces";
import {FormControlNames} from "../../../constants/input-field-constants";
import {DisplayValueService} from "../../../services/HelperSevices/display-value.service";

@Component({
  selector: 'app-search-select-input',
  templateUrl: './search-select-input.component.html'
})
export class SearchSelectInputComponent extends FormBuilding implements OnInit{
  @Output() iconClickEmitter = new EventEmitter<any>();

  @Input() inputFormControlName: FormControlNames;
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
  constructor(private displayValueService: DisplayValueService) {
    super();
  }

  ngOnInit() {
    this.searchControl.valueChanges.subscribe(value => {
      this.changeLoadingWithTimeout(1000);
      this.filteredOptions.next(this.filter(value))
    });
  }

  emitIconClickEvent() {
    this.iconClickEmitter.emit();
  }

  get getCurrentFormControl() {
    return getFormControl(this.inputFormControlName,this.inputFormGroup);
  }

  private filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.list.filter(option => this.getDisplayValue(option).toLowerCase().includes(filterValue));
  }

  private changeLoadingWithTimeout(duration: number) {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, duration);
  }

  getDisplayValue(option: any): string {
    return this.displayValueService.getDisplayValue(option,this.inputFormControlName,this.displayValueProperty)
  };
}
