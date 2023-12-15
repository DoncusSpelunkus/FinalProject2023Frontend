import {Component, EventEmitter} from '@angular/core';
import {LoadableComponent} from "../../../interfaces/component-interfaces";
import {UserManagementService} from "../../../services/HttpRequestSevices/userManagement.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-shipment-info',
  templateUrl: './shipment-info.component.html'
})
export class ShipmentInfoComponent implements LoadableComponent{

  isValidEmitter = new EventEmitter<boolean>();

  search = 'PostmanTest@live.dk'

  constructor(private userService: UserManagementService,
              private router: Router,
              private dialog: MatDialog) {
  }

  setData(data: any): void {
  }

  submit(): void {
  }

  handleFindUser() {
    this.dialog.closeAll();
    this.router.navigate(['userManagement'], { queryParams: { search: this.search } });
  }
}
