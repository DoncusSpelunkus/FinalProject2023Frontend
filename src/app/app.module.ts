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
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
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
import { DeleteUserConfirmationComponent } from './manage-users/delete-user-confirmation/delete-user-confirmation.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { NgxsModule } from '@ngxs/store';
import { LogState } from './states/log/log-state';
import { InventoryState } from './states/inventory/product-state';
import { UserManagementState } from './states/userManagement/user-state';
import {MatStepperModule} from "@angular/material/stepper";
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { CreateProductComponent } from './manage-products/create-product/create-product.component';
import {TextInputComponent} from "./util/text-input/text-input.component";
import { SelectInputComponent } from './util/select-input/select-input.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import { SearchSelectInputComponent } from './util/search-select-input/search-select-input.component';
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import { ButtonComponent } from './util/button/button.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { SettingsCardComponent } from './util/settings-card/settings-card.component';
import { ChangePasswordComponent } from './settings-page/modals/change-password/change-password.component';
import { ManageTemplateComponent } from './templates/manage-template/manage-template.component';
import { LocationsPageComponent } from './locations-page/locations-page.component';
import { ReceiveShipmentComponent } from './shipment-page/receive-shipment/receive-shipment.component';
import {MatListModule} from "@angular/material/list";
import { AddShipmentDetailsComponent } from './shipment-page/add-shipment-details/add-shipment-details.component';
import { RemoveShipmentDetailsComponent } from './shipment-page/remove-shipment-details/remove-shipment-details.component';
import { DeleteShipmentComponent } from './shipment-page/delete-shipment/delete-shipment.component';
import { ShipmentInfoComponent } from './shipment-page/shipment-info/shipment-info.component';
import { TypesPageComponent } from './types-page/types-page.component';
import { BrandsPageComponent } from './brands-page/brands-page.component';
import { CreateBrandComponent } from './brands-page/create-brand/create-brand.component';
import { CreateTypeComponent } from './types-page/create-type/create-type.component';
import { DeleteBrandComponent } from './brands-page/delete-brand/delete-brand.component';
import { DeleteTypeComponent } from './types-page/delete-type/delete-type.component';
import { AuthState } from './states/auth/auth-state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { LocationBatchCreateComponent } from './locations-page/location-batch-create/location-batch-create.component';
import { LocationSingleCreateComponent } from './locations-page/location-single-create/location-single-create.component';
import { DeleteLocationComponent } from './locations-page/delete-location/delete-location.component';
import { DeleteProductsComponent } from './manage-products/delete-products/delete-products.component';
import { ShipmentState } from './states/shipment/shipment-state';
import {MatTooltipModule} from "@angular/material/tooltip";
import { DeleteProductLocationComponent } from './inventory-page/delete-product-location/delete-product-location.component';
import { ConfirmPasswordResetComponent } from './manage-users/confirm-password-reset/confirm-password-reset.component';
import { LogOverviewComponent } from './logs-page/log-overview/log-overview.component';
import { SupportButtonComponent } from './util/support-button/support-button.component';
import {CombineStockRowComponent} from "./inventory-page/combine-stock-row/combine-stock-row.component";


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
        DeleteUserConfirmationComponent,
        ManageProductsComponent,
        CreateProductComponent,
        TextInputComponent,
        SelectInputComponent,
        SearchSelectInputComponent,
        ButtonComponent,
        SettingsPageComponent,
        SettingsCardComponent,
        ChangePasswordComponent,
        SearchSelectInputComponent,
        ManageTemplateComponent,
        LocationsPageComponent,
        ReceiveShipmentComponent,
        AddShipmentDetailsComponent,
        RemoveShipmentDetailsComponent,
        DeleteShipmentComponent,
        ShipmentInfoComponent,
        TypesPageComponent,
        BrandsPageComponent,
        CreateBrandComponent,
        CreateTypeComponent,
        DeleteBrandComponent,
        DeleteTypeComponent,
        LocationBatchCreateComponent,
        LocationSingleCreateComponent,
        DeleteLocationComponent,
        DeleteProductsComponent,
        DeleteProductLocationComponent,
        ConfirmPasswordResetComponent,
        LogOverviewComponent,
        SupportButtonComponent,
        CombineStockRowComponent,
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
    MatSelectModule,
    MatCheckboxModule,
    NgxsModule.forRoot([LogState, InventoryState, UserManagementState, AuthState, ShipmentState], {
      developmentMode: true
    }),
    NgxsStoragePluginModule.forRoot({key: ['Auth']}),
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatSelectSearchModule,
    MatListModule,
    MatTooltipModule
  ],
  providers: [MatSnackBar, ActivityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
