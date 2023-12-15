import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-settings-card',
  templateUrl: './settings-card.component.html'
})
export class SettingsCardComponent {

  @Input() displayText: string;
  @Input() buttonText: string;
  @Input() icon: string;
  @Input() callbackFn: () => void;
}

export interface SettingsCardConfig {
  displayText: string;
  buttonText: string;
  icon: string;
  callbackFn: () => void;
}
