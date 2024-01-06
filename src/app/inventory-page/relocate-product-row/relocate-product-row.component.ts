import {AfterViewInit, Component, HostBinding, Input, OnInit} from '@angular/core';
import {Location, ProductLocation, MoveQuantityDTO} from "../../../entities/Inventory";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormControlNames} from "../../../constants/input-field-constants";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormBuilding} from "../../../interfaces/component-interfaces";
import {Select, Store} from "@ngxs/store";
import {ProductSelector} from "../../states/inventory/product-selector";
import {Observable} from "rxjs";
import {DynamicDialogComponent} from "../../util/dynamic-dialog/dynamic-dialog.component";
import {DeleteProductsComponent} from "../../manage-products/delete-products/delete-products.component";
import {MatDialog} from "@angular/material/dialog";
import {
  LocationSingleCreateComponent
} from "../../locations-page/location-single-create/location-single-create.component";
import {valueRequired} from "../../../util/form-control-validators";
import {createItem, moveQuantity} from "../../states/inventory/product-actions";

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
      [FormControlNames.PRODUCT_LOCATION] : [this.locations.find(location => location.locationId === this.productLocation.locationId),valueRequired(FormControlNames.PRODUCT_LOCATION)]
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
    this.locations$.subscribe((locations: Location[]) => {
      this.locations = locations;
    })
  }

  handleUpdateLocation() {
    const dto: MoveQuantityDTO = this.getDTO();
    this.store.dispatch(new moveQuantity(dto))
  }

  private getDTO(): MoveQuantityDTO {
    return {
      productSKU: this.productLocation.productSku,
      quantity: this.productLocation.quantity,
      locationId: this.formGroup.get(FormControlNames.PRODUCT_LOCATION).value.locationId,
      sourcePLocationId: this.productLocation.productLocationId,
      destinationPLocationId: this.productLocation.productLocationId,
      type: 2//move to a new location
    }
  }
}
