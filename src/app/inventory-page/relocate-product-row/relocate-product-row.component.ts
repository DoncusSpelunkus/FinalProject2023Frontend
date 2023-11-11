import {Component, HostBinding, Input} from '@angular/core';
import {ProductLocation} from "../../../entities/ProductLocation";

@Component({
  selector: 'app-relocate-product-row',
  templateUrl: './relocate-product-row.component.html'
})
export class RelocateProductRowComponent {
  @HostBinding('style.width') width = '100%'
  @HostBinding('style.height') height = '100%'

  @Input() productLocation: ProductLocation;
}
