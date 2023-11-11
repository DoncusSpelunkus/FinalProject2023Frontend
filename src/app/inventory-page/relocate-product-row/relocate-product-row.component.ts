import {AfterViewInit, Component, HostBinding, Input, OnInit} from '@angular/core';
import {ProductLocation} from "../../../entities/ProductLocation";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormControlNames} from "../../../constants/input-field-constants";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-relocate-product-row',
  templateUrl: './relocate-product-row.component.html',
  animations: [
    trigger('expandAnimation', [
      state('collapsed', style({ height: '0', overflow: 'hidden' })),
      state('expanded', style({ height: '*', overflow: 'hidden' })),
      transition('collapsed => expanded', animate('300ms ease-out')),
    ]),
  ],
})
export class RelocateProductRowComponent implements OnInit, AfterViewInit {
  @HostBinding('style.width') width = '100%'
  @HostBinding('style.height') height = '100%'

  @Input() productLocation: ProductLocation;

  formGroup: FormGroup;
  expandState: string = 'collapsed';

  FormControlNames = [FormControlNames.AISLE, FormControlNames.COLUMN, FormControlNames.ROW, FormControlNames.SHELF]

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  ngAfterViewInit() {
    setTimeout(() => this.expandState = 'expanded');
  }

  private initializeFormGroup() {
    this.formGroup = this.formBuilder.group({
      [FormControlNames.AISLE]: [''],
      [FormControlNames.ROW]: [''],
      [FormControlNames.COLUMN]: [''],
      [FormControlNames.SHELF]: [''],
    });
  }
}
