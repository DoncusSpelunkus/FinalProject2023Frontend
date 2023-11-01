import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login-page/component-modules/login-form/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopnavComponent } from './dashboard/topnav/topnav.component';
import {MatSnackBar} from "@angular/material/snack-bar"
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import { LoginPageComponent } from './login-page/login-page/login-page.component';
import {CollapsableContainerDirective} from "../directives/collapsable-container.directive";
import { ManageUsersPageComponent } from './manage-users/manage-users-page/manage-users-page.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        TopnavComponent,
        LoginPageComponent,
        CollapsableContainerDirective,
        ManageUsersPageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatProgressSpinnerModule

    ],
  providers: [MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
