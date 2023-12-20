import {AfterViewInit, Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {FormBuilding} from "../../interfaces/component-interfaces";
import {MatPaginator} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControlNames} from "../../constants/input-field-constants";
import {getFormControl} from "../../util/form-control-validators";
import {debounceTime, Observable} from "rxjs";
import {DynamicDialogComponent} from "../util/dynamic-dialog/dynamic-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CreateBrandComponent} from "./create-brand/create-brand.component";
import {DeleteBrandComponent} from "./delete-brand/delete-brand.component";
import {BrandService} from "../../services/HttpRequestSevices/brand.service";
import {UserObservable} from "../../services/HelperSevices/userObservable";
import {Brand} from "../../entities/Brand";
import {Select} from "@ngxs/store";
import {UserSelector} from "../states/userManagement/user-selectors";
import {User} from "../../entities/User";
import {ProductSelector} from "../states/inventory/product-selector";

@Component({
  selector: 'app-brands-page',
  templateUrl: './brands-page.component.html'
})
export class BrandsPageComponent extends FormBuilding implements OnInit, AfterViewInit{

  @HostBinding('style.width') width = '100%';
  @HostBinding('style.height') height = '100%';

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  @Select(ProductSelector.getBrands) brands$!: Observable<Brand[]>; // Will get the products from the store

  tableFormGroup: FormGroup;
  dataSource = new MatTableDataSource<Brand>();

  displayedColumns = ['name','delete'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private userObservable: UserObservable) {
    super();
    this.initializeFormGroup();
    this.fetchBrands();
  }

  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    this.bindControlsToElements();
    this.setInitialValuesFromQueryParams();
    this.bindElementsToControls()
  }

  private initializeFormGroup() {
    this.tableFormGroup = this.formBuilder.group({
      [FormControlNames.FILTER]: [''],
      [FormControlNames.PAGE]: [''],
      [FormControlNames.ITEMS_PER_PAGE]: ['']
    })
  }


  get filterValue(): string {
    return getFormControl(FormControlNames.FILTER,this.tableFormGroup).value;
  }

  clearFilterValue() {
    getFormControl(FormControlNames.FILTER,this.tableFormGroup).reset();
  }

  private setInitialValuesFromQueryParams() {
    const currentParams = this.route.snapshot.queryParams;

    getFormControl(FormControlNames.FILTER, this.tableFormGroup)
      .setValue(currentParams[FormControlNames.FILTER] || '', { emitEvent: true });

    getFormControl(FormControlNames.PAGE, this.tableFormGroup)
      .setValue(currentParams[FormControlNames.PAGE] || '', { emitEvent: true });

    getFormControl(FormControlNames.ITEMS_PER_PAGE, this.tableFormGroup)
      .setValue(currentParams[FormControlNames.ITEMS_PER_PAGE] || '', { emitEvent: true });
  }

  private bindControlsToElements() {
    getFormControl(FormControlNames.ITEMS_PER_PAGE, this.tableFormGroup).valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        const pageSize = Number(value) || 0;
        this.paginator.pageSize = pageSize;
        this.updateRouteParams(FormControlNames.ITEMS_PER_PAGE, value);
      });

    getFormControl(FormControlNames.PAGE, this.tableFormGroup).valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        const pageIndex = Number(value) || 0;
        this.paginator.pageIndex = pageIndex;
        this.updateRouteParams(FormControlNames.PAGE, value);
      });

    getFormControl(FormControlNames.FILTER, this.tableFormGroup).valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        const query = value?.toString() || '';
        this.dataSource.filter = query.trim().toLowerCase();
        this.updateRouteParams(FormControlNames.FILTER, value);
      });


  }

  private bindElementsToControls() {
    this.paginator.pageSize = 3;
    this.dataSource.paginator = this.paginator;

    this.paginator.page.subscribe((page) => {
      getFormControl(FormControlNames.PAGE,this.tableFormGroup).setValue(page.pageIndex,{emitEvent:true});
      getFormControl(FormControlNames.ITEMS_PER_PAGE,this.tableFormGroup).setValue(page.pageSize,{emitEvent:true});
    })
  }

  private updateRouteParams(paramName: FormControlNames, value: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { [paramName]: value || null },
      queryParamsHandling: 'merge', // preserve other query params
    });
  }

  handleOpenCreateBrandModal() {
    this.dialog.open(DynamicDialogComponent, {
      width: '40%', // Set the width
      height: '30%', // Set the height
      data: {
        component: CreateBrandComponent,
        inputs: null // No dependent data to pass
      }
    });
  }

  handleOpenDeleteBrandWindow(brand) {
    this.dialog.open(DynamicDialogComponent, {
      width: '40%', // Set the width
      height: '30%', // Set the height
      data: {
        component: DeleteBrandComponent,
        inputs: brand // No dependent data to pass
      }
    });
  }

  private fetchBrands() {
    this.brands$.subscribe((brands: Brand[]) => {
      this.dataSource.data = brands;
    })
  }
}
