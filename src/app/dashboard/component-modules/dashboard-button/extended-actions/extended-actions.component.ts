import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ChildrenAction, DashboardCommunicationService} from "../../../../../services/HelperSevices/dashboard-communication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-extended-actions',
  templateUrl: './extended-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ExtendedActionsComponent{
  @Input() config: ChildrenAction

  constructor(public sharedDataService:DashboardCommunicationService,
              private router: Router) {
  }

  handleClick() {
    this.router.navigateByUrl(this.config.actionLink);
    this.sharedDataService.emitExtendedActionClick()
  }
}
