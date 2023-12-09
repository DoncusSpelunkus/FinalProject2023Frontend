import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ChildrenAction, DashboardCommunicationService} from "../../../../../services/HelperSevices/dashboard-communication.service";

@Component({
  selector: 'app-extended-actions',
  templateUrl: './extended-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ExtendedActionsComponent{
  @Input() config: ChildrenAction

  constructor(public sharedDataService:DashboardCommunicationService) {
  }

  handleClick() {
    this.sharedDataService.emitExtendedActionClick()
  }
}
