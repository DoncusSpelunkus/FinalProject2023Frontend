import { FormGroup } from '@angular/forms';
import {combineLatest, debounceTime, distinctUntilChanged, Subscription} from 'rxjs';
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

export function getCombinedFormGroupValiditySubscription(
  formGroups: FormGroup[],
  isValidEmitter: EventEmitter<boolean>
): Subscription {
  const statusObservables = formGroups.map(formGroup => formGroup.statusChanges);

  return combineLatest(statusObservables).subscribe(statuses => {
    const allValid = statuses.every(status => status === 'VALID');
    isValidEmitter.emit(allValid);
  });
}
