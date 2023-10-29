import {Component, HostBinding, signal} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @HostBinding('style.width') width = '100%';

  isExpanded = false;

  extendNavigation() {
    this.isExpanded = true;
  }
}
