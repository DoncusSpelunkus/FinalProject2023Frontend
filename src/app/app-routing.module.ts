import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page/login-page.component";
import {ManageUsersPageComponent} from "./manage-users/manage-users-page/manage-users-page.component";

const routes: Routes = [
  { path: 'login', component:  LoginPageComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'users', pathMatch: 'full', component: ManageUsersPageComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
