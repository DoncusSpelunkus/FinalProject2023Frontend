import { Injectable } from '@angular/core';
import {fromEvent, mapTo, merge, timer } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { ClearUser } from 'src/app/states/auth/auth-action';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {


  private inactivityTime = 1000 * 60 * 30; // 30 minutes
  private inactivityTimer = timer(this.inactivityTime);

  
  constructor(private store: Store, private matsnackbar: MatSnackBar) { }

  startMonitoring() {
    const activityEvents = merge(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'click'),
      fromEvent(document, 'keypress'),
      fromEvent(document, 'scroll'),
      fromEvent(document, 'touch')
    );

    activityEvents.subscribe(() => {
      this.inactivityTimer = timer(this.inactivityTime);
    });

    this.inactivityTimer.pipe(mapTo(null)).subscribe(() => { 
      this.store.dispatch(new ClearUser());
      this.matsnackbar.open('You have been logged out due to inactivity', 'X', {duration: 1000});
     });
  }


}