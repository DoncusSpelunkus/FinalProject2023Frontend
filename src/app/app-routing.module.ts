import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page/login-page.component";
import { AdminGuardService } from 'src/services/adminGuard.service';
import { SalesGuardService } from 'src/services/salesUserGuard.service';
import {ManageUsersPageComponent} from "./manage-users/manage-users-page/manage-users-page.component";
import {LogsPageComponent} from "./logs-page/logs-page.component";
import {ShipmentPageComponent} from "./shipment-page/shipment-page.component";
import {InventoryPageComponent} from "./inventory-page/inventory-page.component";

const routes: Routes = [
  { path: 'login', component:  LoginPageComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: "userManagement", component: ManageUsersPageComponent},
  { path: "logs", component: LogsPageComponent },
  { path: "shipment", component: ShipmentPageComponent, canActivate: [SalesGuardService] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
