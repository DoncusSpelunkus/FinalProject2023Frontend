import {AfterViewInit, Component, HostBinding, OnInit, signal, TemplateRef, ViewChild} from '@angular/core';
import {ButtonConfig, DashboardCommunicationService} from "./services/dashboard-communication.service";
import {identity, Subscription} from "rxjs";
import {inventoryButtonConfig, productsButtonConfig, usersButtonConfig} from "../../constants/dashboard-actions";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit{

  currentActionsTemplate: TemplateRef<any>;

  @ViewChild('publicActions') publicActionsTemplate: TemplateRef<any>;
  @ViewChild('superAdminActions') superAdminActionsTemplate: TemplateRef<any>;
  @ViewChild('adminActions') adminActionsTemplate: TemplateRef<any>;
  @ViewChild('userActions') userActionsTemplate: TemplateRef<any>;

  isExpanded = false;
  selectedAction: ButtonConfig | null;

  userRole: any;

  private actionSelectionSubscription: Subscription;
  private extendedActionClickSubscription: Subscription;

  constructor(public communicationService:DashboardCommunicationService) {
  }

  ngOnInit(): void {
    this.setupSubscriptions();
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

  /**
   * This method sets up the subscription to the dashboard communication
   * service
   * we start tracking the currently selected dashboard action
   * to properly keep them selected, to display children actions
   * and to manage it across the application
   * @private
   */
  private setupSubscriptions() {
    this.actionSelectionSubscription = this.communicationService.buttonConfig$.subscribe(selectedAction => {
      this.selectedAction = selectedAction;
      if (selectedAction?.childrenActions) {
        this.extendNavigation();
      }
    })

    this.extendedActionClickSubscription = this.communicationService.extendedActionClick$.subscribe(() => {
      this.collapseNavigation();
    })
  }

  superAdminActions: ButtonConfig[] = [];
  adminActions: ButtonConfig[] = [
    usersButtonConfig,
    inventoryButtonConfig,
    productsButtonConfig
  ]
  userActions: ButtonConfig[] = [
    usersButtonConfig,
    inventoryButtonConfig,
    productsButtonConfig
  ];
  publicActions: ButtonConfig[];
}

export enum ActionTemplates {
  Public = 'public',
  SuperAdmin = 'superAdmin',
  Admin = 'admin',
  User = 'user',
}

