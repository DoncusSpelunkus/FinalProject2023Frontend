import { FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

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
