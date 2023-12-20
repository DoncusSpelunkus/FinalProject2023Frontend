import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilding, LoadableComponent} from "../../../interfaces/component-interfaces";
import {FormBuilder, FormGroup} from "@angular/forms";
import {FormControlNames} from "../../../constants/input-field-constants";
import {valueRequired} from "../../../util/form-control-validators";
import {getCombinedFormGroupValiditySubscription} from "../../../util/subscription-setup";
import {Observable, Subscription} from "rxjs";
import {Select, Store} from '@ngxs/store';
import { createItem } from 'src/app/states/inventory/product-actions';
import { EntityTypes } from 'src/constants/product-types';
import {Brand} from "../../../entities/Brand";
import {UserSelector} from "../../states/userManagement/user-selectors";
import {User} from "../../../entities/User";
import {ProductSelector} from "../../states/inventory/product-selector";
import {Product, Type} from "../../../entities/Inventory";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html'
})
export class CreateProductComponent extends FormBuilding implements LoadableComponent, OnInit, OnDestroy{

  isLinear = false;

  @Output() isValidEmitter = new EventEmitter<any>;

  @Select(ProductSelector.getBrands) brands$!: Observable<Brand[]>;
  brandList: Brand[];

  @Select(ProductSelector.getTypes) types$!: Observable<Type[]>;
  typeList: Type[];

  productInfoFormGroup: FormGroup;
  productStorageInfoFormGroup: FormGroup;
  supplierInfoFormGroup: FormGroup;

  private formGroupStatusSubscription: Subscription;
  private brandSubscription: Subscription;
  private typeSubscription: Subscription;

  private product: Product;

  constructor(private _formBuilder: FormBuilder,
    private store: Store) {
    super();
  }

  ngOnInit(): void {
    this.initializeFormGroups();
    this.initializeSubscriptions();
    this.setFormControlData(this.product);
  }
  setData(data: any): void {
    this.product = data;
  }
  submit(): void {
    const productDTO: Product = this.getProductDTO();
    this.store.dispatch(new createItem(productDTO, EntityTypes[1]));
  }

  private initializeFormGroups() {
    this.productInfoFormGroup = this._formBuilder.group({
      [FormControlNames.SKU]: ['',valueRequired(FormControlNames.SKU)],
      [FormControlNames.NAME]: ['',valueRequired(FormControlNames.NAME)],
      [FormControlNames.DESCRIPTION]: ['',valueRequired(FormControlNames.DESCRIPTION)],
      [FormControlNames.CATEGORY]: ['',valueRequired(FormControlNames.CATEGORY)],
      [FormControlNames.BRAND]: ['',valueRequired(FormControlNames.BRAND)],
      [FormControlNames.TYPE]: ['',valueRequired(FormControlNames.TYPE)]
    })

    this.productStorageInfoFormGroup = this._formBuilder.group({
      [FormControlNames.EXPIRY_DATE]: ['',valueRequired(FormControlNames.EXPIRY_DATE)],
      [FormControlNames.MINIMUM_CAPACITY]: ['',valueRequired(FormControlNames.MINIMUM_CAPACITY)],
      [FormControlNames.WIDTH]: ['',valueRequired(FormControlNames.WIDTH)],
      [FormControlNames.WEIGHT]: ['',valueRequired(FormControlNames.WEIGHT)],
      [FormControlNames.LENGTH]: ['',valueRequired(FormControlNames.LENGTH)],
      [FormControlNames.HEIGHT]: ['',valueRequired(FormControlNames.HEIGHT)]
    })

    this.supplierInfoFormGroup = this._formBuilder.group({
      [FormControlNames.SUPPLIER_NAME]: ['',valueRequired(FormControlNames.SUPPLIER_NAME)],
      [FormControlNames.SUPPLIER_CONTACT]: ['',valueRequired(FormControlNames.SUPPLIER_CONTACT)]
    })
  }

  handleOpenCreateTypeDialog() {
    console.log('create type')
  }

  handleOpenCreateBrandDialog() {
    console.log('create brand')
  }

  private initializeSubscriptions() {
    this.formGroupStatusSubscription = getCombinedFormGroupValiditySubscription([this.productStorageInfoFormGroup,this.supplierInfoFormGroup,this.productInfoFormGroup],this.isValidEmitter)
    this.brandSubscription = this.brands$.subscribe((brands: Brand[]) => {
      this.brandList = brands;
    })
    this.typeSubscription = this.types$.subscribe((types: Type[]) => {
      this.typeList = types;
    })
  }

  ngOnDestroy(): void {
    if (this.formGroupStatusSubscription) {
      this.formGroupStatusSubscription.unsubscribe();
    }
    if (this.brandSubscription) {
      this.brandSubscription.unsubscribe();
    }
    if (this.typeSubscription) {
    this.typeSubscription.unsubscribe();
    }
  }

  private getProductDTO(): Product {
    return {
      sku: this.productInfoFormGroup.get(FormControlNames.SKU).value,
      name: this.productInfoFormGroup.get(FormControlNames.NAME).value,
      description: this.productInfoFormGroup.get(FormControlNames.DESCRIPTION).value,
      category: this.productInfoFormGroup.get(FormControlNames.CATEGORY).value,
      brandId: this.productInfoFormGroup.get(FormControlNames.BRAND).value.brandId,
      typeId: this.productInfoFormGroup.get(FormControlNames.TYPE).value.typeId,

      weight: this.productStorageInfoFormGroup.get(FormControlNames.WEIGHT).value,
      height: this.productStorageInfoFormGroup.get(FormControlNames.HEIGHT).value,
      length: this.productStorageInfoFormGroup.get(FormControlNames.LENGTH).value,
      width: this.productStorageInfoFormGroup.get(FormControlNames.WIDTH).value,
      ExpireDateTime: this.productStorageInfoFormGroup.get(FormControlNames.EXPIRY_DATE).value,
      minimumCapacity: this.productStorageInfoFormGroup.get(FormControlNames.MINIMUM_CAPACITY).value,

      supplierContact: this.supplierInfoFormGroup.get(FormControlNames.SUPPLIER_CONTACT).value,
      supplierName: this.supplierInfoFormGroup.get(FormControlNames.SUPPLIER_NAME).value
    }

  }

  private setFormControlData(data: Product) {
    if (!data) {
      return;
    }
    this.productInfoFormGroup.patchValue({
      [FormControlNames.SKU]: data.sku,
      [FormControlNames.NAME]: data.name,
      [FormControlNames.DESCRIPTION]: data.description,
      [FormControlNames.CATEGORY]: data.category,
      [FormControlNames.BRAND]: { brandId: data.brandId }, // assuming BRAND is an object with brandId
      [FormControlNames.TYPE]: { typeId: data.typeId } // assuming TYPE is an object with typeId
    });

    this.productStorageInfoFormGroup.patchValue({
      [FormControlNames.WEIGHT]: data.weight,
      [FormControlNames.HEIGHT]: data.height,
      [FormControlNames.LENGTH]: data.length,
      [FormControlNames.WIDTH]: data.width,
      [FormControlNames.EXPIRY_DATE]: data.ExpireDateTime,
      [FormControlNames.MINIMUM_CAPACITY]: data.minimumCapacity
    });

    this.supplierInfoFormGroup.patchValue({
      [FormControlNames.SUPPLIER_CONTACT]: data.supplierContact,
      [FormControlNames.SUPPLIER_NAME]: data.supplierName
    });
  }
}
