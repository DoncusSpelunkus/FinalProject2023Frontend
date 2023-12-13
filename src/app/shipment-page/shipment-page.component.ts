import {AfterViewInit, Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {FormBuilding} from "../../interfaces/component-interfaces";
import {MatPaginator} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControlNames} from "../../constants/input-field-constants";
import {getFormControl} from "../../util/form-control-validators";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-shipment-page',
  templateUrl: './shipment-page.component.html'
})
export class ShipmentPageComponent extends FormBuilding implements OnInit, AfterViewInit{

  @HostBinding('style.width') width = '100%';
  @HostBinding('style.height') height = '100%';

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  tableFormGroup: FormGroup;
  dataSource = new MatTableDataSource<SimpleDummyData>();

  displayedColumns = ['name'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
    super();
    this.initializeFormGroup();
  }

  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    this.initializeSourceData();//TODO REMOVE
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

  private initializeSourceData(): void {
    const values: SimpleDummyData[] = [
      {name: 'Bob'},
      {name: 'bin'},
      {name: 'bon'},
      {name: 'Van'},
      {name: 'Helsing'},
      {name: 'John'},
      {name: 'Alex'},
      {name: 'Tiffany'},
      {name: 'JAke'},
      {name: 'Alex'},
      {name: 'Twink'},
    ]
    this.dataSource.data = values;
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
}

export interface SimpleDummyData {
  name: string;
}
