import { AfterViewInit, Component, HostBinding, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { ButtonConfig, DashboardCommunicationService } from "./services/dashboard-communication.service";
import { identity, Subscription } from "rxjs";
import { inventoryButtonConfig, productsButtonConfig, usersButtonConfig } from "../../constants/dashboard-actions";
import { UserObservable } from 'src/services/userObservable';
import { User } from 'src/entities/User';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, AfterViewInit {

  currentActionsTemplate: TemplateRef<any>;

  @ViewChild('publicActions') publicActionsTemplate: TemplateRef<any>;
  @ViewChild('superAdminActions') superAdminActionsTemplate: TemplateRef<any>;
  @ViewChild('adminActions') adminActionsTemplate: TemplateRef<any>;
  @ViewChild('userActions') userActionsTemplate: TemplateRef<any>;

  isExpanded = false;
  selectedAction: ButtonConfig | null;

  userRole: any;
  user: User | null = null;
  login: boolean = false;

  private userSubscription: Subscription;

  private actionSelectionSubscription: Subscription;
  private extendedActionClickSubscription: Subscription;

  async ngOnInit(): Promise<void> {
    await this.setupSubscriptions();
  }

  constructor(public communicationService: DashboardCommunicationService, private userObservable: UserObservable, private route: Router, private activeRoute: ActivatedRoute) {

  }



  ngAfterViewInit(): void {
    this.userRole = this.getUserRole();
    this.enableUserActions();
  }

  ngOnDestroy(): void {
    this.actionSelectionSubscription.unsubscribe();
    this.extendedActionClickSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  extendNavigation() {
    const currentPath = this.route.url;
    if (currentPath.includes('/login'))
      this.collapseNavigation();
    else
      this.isExpanded = true;
  }

  collapseNavigation() {
    this.isExpanded = false;
  }

  private updateUserRole() {
    if (this.user) {
      this.userRole = this.user?.role;
      this.enableUserActions();
    }
  }

  private getUserRole() {
    if (this.userRole) {
      switch (this.userRole.toLowerCase()) {
        case "admin":
          return ActionTemplates.Admin;
        case "sales":
          return ActionTemplates.Admin;
        case "base":
          return ActionTemplates.User;
        default:
          return ActionTemplates.Public;
      }
    }
    return ActionTemplates.Public;
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
  private async setupSubscriptions() {
    this.userSubscription = this.userObservable.user$.subscribe((user) => {
      this.userRole = user?.role;
      this.ngAfterViewInit();
    });

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

  async logout() {
    await this.userObservable.clearUser();
    this.route.navigateByUrl("/login");
    this.ngAfterViewInit();
    this.collapseNavigation();
  }

  superAdminConfig: ButtonConfig[] = [
    inventoryButtonConfig,
    productsButtonConfig
  ];
  adminConfig: ButtonConfig[] = [
    usersButtonConfig,
    inventoryButtonConfig,
    productsButtonConfig
  ]
  userConfig: ButtonConfig[] = [
    usersButtonConfig,
    inventoryButtonConfig,
    productsButtonConfig
  ];
  publicConfig: ButtonConfig[] = [
  ];


  @HostBinding('style.width') width = '100%';
}

export enum ActionTemplates {
  Public = 'public',
  SuperAdmin = 'superAdmin',
  Admin = 'admin',
  User = 'user',
}

