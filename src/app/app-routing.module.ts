import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page/login-page.component";
import { AdminGuardService } from 'src/services/adminGuard.service';
import { SalesGuardService } from 'src/services/salesUserGuard.service';
import {ManageUsersPageComponent} from "./manage-users/manage-users-page/manage-users-page.component";
import {LogsPageComponent} from "./logs-page/logs-page.component";
import {WarehouseManagementPageComponent} from "./warehouse-management-page/warehouse-management-page.component";
import {ShipmentPageComponent} from "./shipment-page/shipment-page.component";

const routes: Routes = [
  { path: 'login', component:  LoginPageComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
  { path: "userManagement", component: ManageUsersPageComponent, canActivate: [AdminGuardService] },
  { path: "logs", component: LogsPageComponent, canActivate: [AdminGuardService] },
  { path: "warehouse", component: WarehouseManagementPageComponent},
  { path: "shipment", component: ShipmentPageComponent, canActivate: [SalesGuardService] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
