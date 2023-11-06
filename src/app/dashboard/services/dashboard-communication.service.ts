import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

export type ButtonIdentity = 'USERS' | 'PRODUCTS' | 'INVENTORY';

export interface ChildrenAction {
  actionName: string;
  actionLink: string;
}
export interface ButtonConfig {
  identity: ButtonIdentity,
  displayValue: string;
  routeLink: string;
  childrenActions: ChildrenAction[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardCommunicationService {

  private buttonConfigSubject = new BehaviorSubject<ButtonConfig | null>(null);
  buttonConfig$ = this.buttonConfigSubject.asObservable();

  updateButtonConfig(config: ButtonConfig) {
    this.buttonConfigSubject.next(config);
  }
}
