import {Component, HostBinding} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {




  @HostBinding('style.height') height = '100%';
  @HostBinding('style.width') width = '100%';
}
