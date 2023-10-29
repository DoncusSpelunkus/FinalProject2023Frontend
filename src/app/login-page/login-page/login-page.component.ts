import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent {


  @HostBinding('style.height') height = '100%';
  @HostBinding('style.width') width = '100%';
}
