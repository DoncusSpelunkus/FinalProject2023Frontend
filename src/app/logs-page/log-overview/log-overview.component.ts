import {Component, EventEmitter} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {Log} from "../../../entities/Log";
import {User} from "../../../entities/User";
import {UserManagementService} from "../../../services/HttpRequestSevices/userManagement.service";
import {Location, Product} from "../../../entities/Inventory";
import {Select} from "@ngxs/store";
import {ProductSelector} from "../../states/inventory/product-selector";
import {Observable} from "rxjs";
import {formatLocation} from "../../../util/display-value-strategies";
import {MatDialog} from "@angular/material/dialog";
import {Router, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-log-overview',
  templateUrl: './log-overview.component.html'
})
export class LogOverviewComponent implements LoadableComponent{

  isValidEmitter: EventEmitter<boolean>;

  selectedLog: Log
  employee: User

  @Select(ProductSelector.getLocations) locations$!: Observable<Location[]>; // Will get the products from the store
  locations: Location[];

  @Select(ProductSelector.getProducts) products$!: Observable<Product[]>; // Will get the products from the store
  products: Product[];

  locationTo: Location;
  locationFrom: Location;
  setData(data: any): void {
    this.selectedLog = data;
    this.fetchData();
  }
  constructor(private userService: UserManagementService,
              private dialog: MatDialog,
              private router: Router) {
    this.findData();
  }
  submit(): void {
  }

  get getEmployeeName() {
    return this.employee?.name
  }


  get getProduct(): Product {
    return this.products?.find(product => product.sku === this.selectedLog.productSKU)
  }

  get getLocationFrom() {
    return formatLocation(this.locationFrom) ;
  }

  get getLocationTo() {
    return formatLocation(this.locationTo);
  }

  private fetchData() {
    this.userService.getByEmployeeId(this.selectedLog.userId).then(user => {
      this.employee = user;
    })

    this.locationTo = this.locations.find(location => location.locationId === this.selectedLog.from_location_id);
  }


  private findData() {
    this.locations$.subscribe((locations: Location[]) => {
      this.locations = locations;
    })

    this.products$.subscribe((products: Product[]) => {
      this.products = products;
    })

  }

  handleFindUser() {
    this.dialog.closeAll();
    this.router.navigate(['userManagement'], { queryParams: { search: this.employee.name } });
  }

  handleFindProduct() {
    this.dialog.closeAll();
    this.router.navigate(['products'], { queryParams: { search: this.getProduct.sku } });
  }
}


