import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ButtonConfig, DashboardCommunicationService} from "../../../../../services/dashboard-communication.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-button',
  templateUrl: './dashboard-button.component.html',
})
export class DashboardButtonComponent implements OnInit, OnDestroy{
  @Input() buttonConfig: ButtonConfig;

  isSelected: boolean;

  private buttonSelectionSubscription: Subscription;

  constructor(public communicationService:DashboardCommunicationService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setupSubscriptions();
  }

  ngOnDestroy(): void {
    this.endSubscriptions();
  }

  /**
   * Subscribe to the selected button value in communication service
   * update the status of button instance
   * @private
   */
  private setupSubscriptions() {
    this.buttonSelectionSubscription = this.communicationService.buttonConfig$.subscribe(selectedButton => {
      this.isSelected = selectedButton?.identity === this.buttonConfig.identity;
    })
  }

  private endSubscriptions() {
    if (this.buttonSelectionSubscription) {
      this.buttonSelectionSubscription.unsubscribe();
    }
  }

  handleClick() {
    if (this.buttonConfig.childrenActions) {
      this.communicationService.updateButtonConfig(this.buttonConfig);
    } else {
      this.communicationService.updateButtonConfig(null);
      this.communicationService.emitExtendedActionClick();
      this.handleNavigate();
    }
  }

  private handleNavigate() {
    this.router.navigateByUrl(this.buttonConfig.routeLink);
  }
}
