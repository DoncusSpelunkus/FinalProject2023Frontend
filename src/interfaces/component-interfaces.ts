// loadable-component.interface.ts
import { EventEmitter } from '@angular/core';

export interface LoadableComponent {
  submit: EventEmitter<any>;
  cancel: EventEmitter<any>;
}
