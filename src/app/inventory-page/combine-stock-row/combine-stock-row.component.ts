import {AfterViewInit, Component, HostBinding, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Location, MoveQuantityDTO, ProductLocation} from "../../../entities/Inventory";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Select, Store} from "@ngxs/store";
import {ProductSelector} from "../../states/inventory/product-selector";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {FormControlNames} from "../../../constants/input-field-constants";
import {valueRequired} from "../../../util/form-control-validators";
import {DynamicDialogComponent} from "../../util/dynamic-dialog/dynamic-dialog.component";
import {
  LocationSingleCreateComponent
} from "../../locations-page/location-single-create/location-single-create.component";
import {moveQuantity} from "../../states/inventory/product-actions";
import {FormBuilding} from "../../../interfaces/component-interfaces";

@Component({
  selector: 'app-combine-stock-row',
  templateUrl: './combine-stock-row.component.html',
  animations: [
    trigger('expandAnimation', [
      state('collapsed', style({ height: '0', overflow: 'hidden' })),
      state('expanded', style({ height: '*', overflow: 'hidden' })),
      transition('collapsed => expanded', animate('300ms ease-out')),
    ]),
  ],
})
export class CombineStockRowComponent extends FormBuilding implements OnInit, AfterViewInit{
  @HostBinding('style.width') width = '100%'
  @HostBinding('style.height') height = '100%'

  @Input() productLocation: ProductLocation;

  formGroup: FormGroup;
  expandState: string = 'collapsed';

  @Select(ProductSelector.getProductLocations) productLocations$!: Observable<ProductLocation[]>; // Will get the products from the store
  productLocations: ProductLocation[];

  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.initializeData();
    this.initializeFormGroup();
  }

  ngAfterViewInit() {
    setTimeout(() => this.expandState = 'expanded');
  }

  private initializeFormGroup() {
    this.formGroup = this.formBuilder.group({
      [FormControlNames.PRODUCT_LOCATION] : [this.productLocations.find(location => location.locationId === this.productLocation.locationId),valueRequired(FormControlNames.PRODUCT_LOCATION)]
    });
  }

  handleOpenCreateLocationWindow() {
    this.dialog.open(DynamicDialogComponent, {
      width: '60%', // Set the width
      height: '35%', // Set the height
      data: {
        component: LocationSingleCreateComponent,
        inputs: null
      }
    });
  }

  private initializeData() {
    this.productLocations$.subscribe((locations: Location[]) => {
      this.productLocations = locations;
    })
  }

  handleUpdateLocation() {
    const dto: MoveQuantityDTO = this.getDTO();
    this.store.dispatch(new moveQuantity(dto))
  }

  private getDTO(): MoveQuantityDTO {
    console.log(this.productLocation)
    return {
      productSKU: this.productLocation.productSku,
      quantity: this.productLocation.quantity,
      locationId: this.formGroup.get(FormControlNames.PRODUCT_LOCATION).value.locationId,
      sourcePLocationId: this.productLocation.productLocationId,
      destinationPLocationId: this.productLocation.productLocationId,
      type: 3//move to existing location
    }
  }
}
