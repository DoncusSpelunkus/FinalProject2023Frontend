import {AfterViewInit, Component, HostBinding, Input, OnInit} from '@angular/core';
import {Location, ProductLocation} from "../../../entities/Inventory";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormControlNames} from "../../../constants/input-field-constants";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormBuilding} from "../../../interfaces/component-interfaces";
import {Select} from "@ngxs/store";
import {ProductSelector} from "../../states/inventory/product-selector";
import {Observable} from "rxjs";

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
export class RelocateProductRowComponent extends FormBuilding implements OnInit, AfterViewInit {
  @HostBinding('style.width') width = '100%'
  @HostBinding('style.height') height = '100%'

  @Input() productLocation: ProductLocation;

  formGroup: FormGroup;
  expandState: string = 'collapsed';

  @Select(ProductSelector.getLocations) locations$!: Observable<Location[]>; // Will get the products from the store
  locations: Location[];

  constructor(private formBuilder: FormBuilder) {
  super();
  }

  ngOnInit(): void {
    this.initializeFormGroup();
    this.initializeData();
  }

  ngAfterViewInit() {
    setTimeout(() => this.expandState = 'expanded');
  }

  private initializeFormGroup() {
    this.formGroup = this.formBuilder.group({
      [FormControlNames.PRODUCT_LOCATION]: [''],
    });
  }

  handleOpenCreateLocationWindow() {

  }

  private initializeData() {
    this.locations$.subscribe((locations: Location[]) => {
      this.locations = locations;
    })
  }
}
