import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-settings-card',
  templateUrl: './settings-card.component.html'
})
export class SettingsCardComponent {

  @Output() emitSelectedEvent = new EventEmitter<any>();

  @Input() displayText: string;
  @Input() buttonText: string;
  @Input() icon: string;
}

export interface SettingsCardConfig {
  displayText: string;
  buttonText: string;
  icon: string;
}
