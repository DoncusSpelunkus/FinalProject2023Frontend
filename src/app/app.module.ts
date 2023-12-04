import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login-page/component-modules/login-form/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
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
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LogsPageComponent } from './logs-page/logs-page.component';
import { ShipmentPageComponent } from './shipment-page/shipment-page.component';
import { ActivityService } from 'src/services/HelperSevices/activityService';
import { DashboardButtonComponent } from './dashboard/component-modules/dashboard-button/dashboard-button/dashboard-button.component';
import {MatRippleModule} from "@angular/material/core";
import { ExtendedActionsComponent } from './dashboard/component-modules/dashboard-button/extended-actions/extended-actions.component';
import { DynamicDialogComponent } from './util/dynamic-dialog/dynamic-dialog.component';
import { CreateUserComponent } from './manage-users/create-user/create-user.component';
import {MatDialogModule} from "@angular/material/dialog";
import { InventoryPageComponent } from './inventory-page/inventory-page.component';
import { StockProductComponent } from './inventory-page/stock-product/stock-product/stock-product.component';
import { IconComponent } from './util/icon/icon.component';
import { RelocateProductRowComponent } from './inventory-page/relocate-product-row/relocate-product-row.component';
import { UpdateQuantityRowComponent } from './inventory-page/update-quantity-row/update-quantity-row.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {MatSelectModule} from "@angular/material/select";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        LoginPageComponent,
        CollapsableContainerDirective,
        ManageUsersPageComponent,
        LogsPageComponent,
        ShipmentPageComponent,
        DashboardButtonComponent,
        ExtendedActionsComponent,
        DynamicDialogComponent,
        CreateUserComponent,
        InventoryPageComponent,
        StockProductComponent,
        IconComponent,
        RelocateProductRowComponent,
        UpdateQuantityRowComponent,
        PageNotFoundComponent,
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
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        MatRippleModule,
        MatDialogModule,
        MatSelectModule
    ],
  providers: [MatSnackBar, ActivityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
