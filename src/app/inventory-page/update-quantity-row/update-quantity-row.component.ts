import {Component, HostBinding, Input} from '@angular/core';
import {ProductLocation} from "../../../entities/Inventory";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-update-quantity-row',
  templateUrl: './update-quantity-row.component.html',
  animations: [
    trigger('expandAnimation', [
      state('collapsed', style({ height: '0', overflow: 'hidden' })),
      state('expanded', style({ height: '*', overflow: 'hidden' })),
      transition('collapsed => expanded', animate('300ms ease-out')),
    ]),
  ],
})
export class UpdateQuantityRowComponent {
  @HostBinding('style.width') width = '100%'
  @HostBinding('style.height') height = '100%'

  @Input() productLocation: ProductLocation;
}
