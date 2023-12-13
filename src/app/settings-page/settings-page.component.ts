import {Component, HostBinding} from '@angular/core';
import {SettingsCardConfig} from "../util/settings-card/settings-card.component";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html'
})
export class SettingsPageComponent {
  @HostBinding('style.width') width = '100%'
  @HostBinding('style.height') height = '100%'

  items: SettingsCardConfig[] = [
    {displayText: 'Change password', buttonText: 'Change', icon: 'lock-alt'},
    {displayText: 'Change password', buttonText: 'Change', icon: 'lock-alt'},
    {displayText: 'Change password', buttonText: 'Change', icon: 'lock-alt'},
    {displayText: 'Change password', buttonText: 'Change', icon: 'lock-alt'},
  ];







}
