import { FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import {EventEmitter} from "@angular/core";

export function setupDistinctControlSubscription(
  formGroup: FormGroup,
  formControlName: string,
  callback: (value: any) => void
): Subscription {
  const control = formGroup.get(formControlName);
  if (!control) {
    throw new Error(`Form control '${formControlName}' does not exist.`);
  }

  return control.valueChanges
    .pipe(
      debounceTime(50),
      distinctUntilChanged()
    )
    .subscribe(callback);
}

export function getFormGroupValiditySubscription(formGroup: FormGroup,isValidEmitter: EventEmitter<any>): Subscription {
  return formGroup.statusChanges.subscribe(status => {
    switch (status) {
      case "VALID":
        isValidEmitter.emit(true);
        break;
      case "DISABLED":
        isValidEmitter.emit(false);
        break;
      case "INVALID":
        isValidEmitter.emit(false);
        break;
      case "PENDING":
        isValidEmitter.emit(false);
        break;
    }
  })
}
