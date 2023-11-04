import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page/login-page.component";
import { UserManagementPageComponent } from './user-management-page/user-management-page.component';
import { AdminGuardService } from 'src/services/adminGuard.service';
import { SalesGuardService } from 'src/services/salesUserGuard.service';

const routes: Routes = [
  { path: 'login', component:  LoginPageComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
  { path: "userManagement", component: UserManagementPageComponent, canActivate: [AdminGuardService] },
  { path: "logs", component: UserManagementPageComponent, canActivate: [AdminGuardService] },
  { path: "warehouse", component: UserManagementPageComponent},
  { path: "shipment", component: UserManagementPageComponent, canActivate: [SalesGuardService] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
