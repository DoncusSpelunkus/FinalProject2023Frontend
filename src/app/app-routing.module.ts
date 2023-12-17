import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from "./login-page/login-page/login-page.component";
import { AdminGuardService } from 'src/services/AuthGuardSevices/adminGuard.service';
import { SalesGuardService } from 'src/services/AuthGuardSevices/salesUserGuard.service';
import {ManageUsersPageComponent} from "./manage-users/manage-users-page/manage-users-page.component";
import {LogsPageComponent} from "./logs-page/logs-page.component";
import {ShipmentPageComponent} from "./shipment-page/shipment-page.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {InventoryPageComponent} from "./inventory-page/inventory-page.component";
import {UnauthenticatedAccessGuard} from "../services/AuthGuardSevices/unauthenticated-access-guard.service";
import {SettingsPageComponent} from "./settings-page/settings-page.component";
import {AuthenticatedGuard} from "../services/AuthGuardSevices/authenticatedGuard";
import {ManageProductsComponent} from "./manage-products/manage-products.component";
import {ManageTemplateComponent} from "./templates/manage-template/manage-template.component";
import {LocationsPageComponent} from "./locations-page/locations-page.component";
import {TypesPageComponent} from "./types-page/types-page.component";
import {BrandsPageComponent} from "./brands-page/brands-page.component";

const routes: Routes = [
  { path: 'login', component:  LoginPageComponent, canActivate: [UnauthenticatedAccessGuard]},
  { path: "userManagement", component: ManageUsersPageComponent, canActivate: [AdminGuardService]},
  { path: "logs", component: LogsPageComponent, canActivate: [AdminGuardService] },
  { path: "inventory", component: InventoryPageComponent, canActivate: [SalesGuardService]},
  { path: "types", component: TypesPageComponent, canActivate: [SalesGuardService]},
  { path: "brands", component: BrandsPageComponent, canActivate: [SalesGuardService]},
  { path: "shipments", component: ShipmentPageComponent, canActivate: [SalesGuardService]},
  { path: "settings", component: SettingsPageComponent, canActivate:[AuthenticatedGuard]},
  { path: 'locations', component: LocationsPageComponent, canActivate: [AdminGuardService]},
  { path: "products", component: ManageProductsComponent, canActivate: [SalesGuardService]},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
