import {fromEvent, merge, switchMap, tap, timer} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ClearUser} from "../../app/states/auth/auth-action";
import {Store} from "@ngxs/store";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  // ... other properties

  private activityEventsSubscription = null;

  private inactivityTime = 1000 * 60 * 30; // 30 minutes

  constructor(private store: Store, private matsnackbar: MatSnackBar) { }

  startMonitoring() {
    if (this.activityEventsSubscription) {
      // If already monitoring, do nothing
      return;
    }

    const activityEvents = merge(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'click'),
      fromEvent(document, 'keypress'),
      fromEvent(document, 'scroll'),
      fromEvent(document, 'touch')
    );

    this.activityEventsSubscription = activityEvents.pipe(
      switchMap(() => timer(this.inactivityTime)),
      tap(() => {
        this.store.dispatch(new ClearUser());
        this.matsnackbar.open('You have been logged out due to inactivity', 'X', { duration: 1000 });
      })
    ).subscribe();
  }

  stopMonitoring() {
    if (this.activityEventsSubscription) {
      this.activityEventsSubscription.unsubscribe();
      this.activityEventsSubscription = null;
    }
  }
}
