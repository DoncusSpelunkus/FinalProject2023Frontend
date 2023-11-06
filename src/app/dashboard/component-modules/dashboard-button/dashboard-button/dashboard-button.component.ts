import {Component, Input, OnInit} from '@angular/core';
import {ButtonConfig, DashboardCommunicationService} from "../../../services/dashboard-communication.service";

@Component({
  selector: 'app-dashboard-button',
  templateUrl: './dashboard-button.component.html',
})
export class DashboardButtonComponent implements OnInit{
  @Input() buttonConfig: ButtonConfig;

  isSelected: boolean;

  constructor(public communicationService:DashboardCommunicationService) { }

  ngOnInit(): void {
    this.setupSubscriptions();
  }

  /**
   * Subscribe to the selected button value in communication service
   * update the status of button instance
   * @private
   */
  private setupSubscriptions() {
    this.communicationService.buttonConfig$.subscribe(selectedButton => {
      if (selectedButton?.identity === this.buttonConfig.identity) {
        this.isSelected = true;
      } else {
        this.isSelected = false;
      }
    })
  }
}
