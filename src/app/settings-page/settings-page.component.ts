import {Component, HostBinding} from '@angular/core';
import {SettingsCardConfig} from "../util/settings-card/settings-card.component";
import {MatDialog} from "@angular/material/dialog";
import {DynamicDialogComponent} from "../util/dynamic-dialog/dynamic-dialog.component";
import {ChangePasswordComponent} from "./modals/change-password/change-password.component";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html'
})
export class SettingsPageComponent {
  @HostBinding('style.width') width = '100%'
  @HostBinding('style.height') height = '100%'

  constructor(private dialog: MatDialog) {
  }

  openChangePasswordDialog = () => {
    this.dialog.open(DynamicDialogComponent, {
      width: '50%', // Set the width
      height: '50%', // Set the height
      data: {
        component: ChangePasswordComponent,
        inputs: null // No dependent data to pass
      }
    });
  }

  items: SettingsCardConfig[] = [
    {displayText: 'Change password', buttonText: 'Change', icon: 'lock-alt',callbackFn: this.openChangePasswordDialog},
    {displayText: 'Change password', buttonText: 'Change', icon: 'lock-alt',callbackFn: this.openChangePasswordDialog},
    {displayText: 'Change password', buttonText: 'Change', icon: 'lock-alt',callbackFn: this.openChangePasswordDialog},
    {displayText: 'Change password', buttonText: 'Change', icon: 'lock-alt',callbackFn: this.openChangePasswordDialog},
  ];







}
