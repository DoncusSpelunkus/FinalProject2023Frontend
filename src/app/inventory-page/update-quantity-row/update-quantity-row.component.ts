import {AfterViewInit, Component, HostBinding, Input, OnInit} from '@angular/core';
import {ProductLocation} from "../../../entities/Inventory";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormBuilding} from "../../../interfaces/component-interfaces";
import {Form, FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {numberOnly, valueRequired} from "../../../util/form-control-validators";

@Component({
  selector: 'app-update-quantity-row',
  templateUrl: './update-quantity-row.component.html',
  animations: [
    trigger('expandAnimation', [
      state('collapsed', style({ height: '0', overflow: 'hidden' })),
      state('expanded', style({ height: '*', overflow: 'hidden' })),
      transition('collapsed => expanded', animate('300ms ease-out')),
    ]),
  ],
})
export class UpdateQuantityRowComponent extends FormBuilding implements OnInit, AfterViewInit{
  @HostBinding('style.width') width = '100%'
  @HostBinding('style.height') height = '100%'

  @Input() productLocation: ProductLocation;
  formGroup: FormGroup;

  expandState: string = 'collapsed';

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.initializeFormGroup();
  }

  private initializeFormGroup() {
    this.formGroup = this.formBuilder.group({
      [FormControlNames.QUANTITY]: [this.productLocation.quantity,[numberOnly(FormControlNames.QUANTITY),valueRequired(FormControlNames.QUANTITY)]]
    })
  }

  ngAfterViewInit() {
    setTimeout(() => this.expandState = 'expanded');
  }

  handleUpdateQuantity() {
    console.error('not implemented')
  }
}
