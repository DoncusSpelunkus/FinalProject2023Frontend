import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from "./login-page/login-page/login-page.component";
import { AdminGuardService } from 'src/services/AuthGuardSevices/adminGuard.service';
import { SalesGuardService } from 'src/services/AuthGuardSevices/salesUserGuard.service';
import {ManageUsersPageComponent} from "./manage-users/manage-users-page/manage-users-page.component";
import {LogsPageComponent} from "./logs-page/logs-page.component";
import {WarehouseManagementPageComponent} from "./warehouse-management-page/warehouse-management-page.component";
import {ShipmentPageComponent} from "./shipment-page/shipment-page.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: 'login', component:  LoginPageComponent},
  { path: "userManagement", component: ManageUsersPageComponent, canActivate: [AdminGuardService]},
  { path: "logs", component: LogsPageComponent, canActivate: [AdminGuardService] },
  { path: "warehouse", component: WarehouseManagementPageComponent},
  { path: "shipment", component: ShipmentPageComponent, canActivate: [SalesGuardService] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
