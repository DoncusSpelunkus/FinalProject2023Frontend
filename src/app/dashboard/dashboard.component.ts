import {AfterViewInit, Component, HostBinding, OnInit, signal, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit{

  currentActionsTemplate: TemplateRef<any>;

  @ViewChild('publicActions') publicActionsTemplate: TemplateRef<any>;
  @ViewChild('superAdminActions') superAdminActionsTemplate: TemplateRef<any>;
  @ViewChild('adminActions') adminActionsTemplate: TemplateRef<any>;
  @ViewChild('userActions') userActionsTemplate: TemplateRef<any>;

  isExpanded = false;

  userRole: any;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.userRole = this.getUserRole();
    this.enableUserActions();
  }

  extendNavigation() {
    this.isExpanded = true;
  }

  collapseNavigation() {
    this.isExpanded = false;
  }

  @HostBinding('style.width') width = '100%';

  private getUserRole() {
    return ActionTemplates.Admin;
  }

  private enableUserActions() {
    const template = this.userRole;
    switch (template) {
      case ActionTemplates.Public:
        this.currentActionsTemplate = this.publicActionsTemplate;
        break;
      case ActionTemplates.SuperAdmin:
        this.currentActionsTemplate = this.superAdminActionsTemplate;
        break;
      case ActionTemplates.Admin:
        this.currentActionsTemplate = this.adminActionsTemplate;
        break;
      case ActionTemplates.User:
        this.currentActionsTemplate = this.userActionsTemplate;
        break;
      default:
        this.currentActionsTemplate = this.publicActionsTemplate;
    }
  }
}

export enum ActionTemplates {
  Public = 'public',
  SuperAdmin = 'superAdmin',
  Admin = 'admin',
  User = 'user',
}

