import {Component, HostBinding, Input} from '@angular/core';
import {ProductLocation} from "../../../entities/Inventory";

@Component({
  selector: 'app-update-quantity-row',
  templateUrl: './update-quantity-row.component.html'
})
export class UpdateQuantityRowComponent {
  @HostBinding('style.width') width = '100%'
  @HostBinding('style.height') height = '100%'

  @Input() productLocation: ProductLocation;
}
