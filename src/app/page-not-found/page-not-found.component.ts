import {ChangeDetectionStrategy, Component, HostBinding} from '@angular/core';
import {LocationStrategy} from "@angular/common";
import {Router} from "@angular/router";
import {FormBuilding} from "../../interfaces/component-interfaces";

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent extends FormBuilding {
  @HostBinding('style.width') width = '100%';
  @HostBinding('style.height') height = '100%'

  constructor(private location: LocationStrategy,
              private router: Router) {
    super();
  }

  handleBack() {
    this.location.back();
  }

  handleHome() {
    this.router.navigateByUrl('');
  }
}
