import {EventEmitter} from "@angular/core";

export interface LoadableComponent {
  setData(data: any): void;
  submit(): void;
  isValidEmitter: EventEmitter<boolean>;
}
