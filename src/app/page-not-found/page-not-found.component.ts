import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {LocationStrategy} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.height') height = '100%'

  constructor(private location: LocationStrategy,
              private router: Router) {
  }

  handleBack() {
    this.location.back();
  }

  handleHome() {
    this.router.navigateByUrl('');
  }
}
