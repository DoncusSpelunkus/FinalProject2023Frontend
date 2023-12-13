import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

export type ButtonIdentity = 'USERS' | 'PRODUCTS' | 'INVENTORY' | 'SYSTEM' | 'LOCATION' | 'SHIPMENT';

export interface ChildrenAction {
  actionName: string;
  actionLink: string;
}
export interface ButtonConfig {
  identity: ButtonIdentity,
  displayValue: string;
  routeLink: string;
  childrenActions?: ChildrenAction[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardCommunicationService {

  private buttonConfigSubject = new BehaviorSubject<ButtonConfig | null>(null);
  buttonConfig$ = this.buttonConfigSubject.asObservable();

  private extendedActionClick = new BehaviorSubject<null | symbol>(null);
  extendedActionClick$ = this.extendedActionClick.asObservable();

  updateButtonConfig(config: ButtonConfig | null) {
    this.buttonConfigSubject.next(config);
  }

  emitExtendedActionClick() {
    this.extendedActionClick.next(null);
  }
}
