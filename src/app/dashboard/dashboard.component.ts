import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
  signal,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ButtonConfig, DashboardCommunicationService } from "../../services/HelperSevices/dashboard-communication.service";
import { identity, Subscription } from "rxjs";
import {
  inventoryButtonConfig, locationButtonConfig,
  productsButtonConfig, shipmentButtonConfig,
  systemButtonConfig,
  usersButtonConfig
} from "../../constants/dashboard-actions";
import { UserObservable } from 'src/services/HelperSevices/userObservable';
import { User } from 'src/entities/User';
import { ActivatedRoute, Router } from '@angular/router';
import {LocationStrategy} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @HostBinding('style.width') width = '100%';

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
    this.tryAndSetUserOnReload();
    this.enableUserActions();
  }

  constructor(public communicationService: DashboardCommunicationService,
              private userObservable: UserObservable,
              private route: Router,
              private cdRef: ChangeDetectorRef,
              private activeRoute: ActivatedRoute,
              private location: LocationStrategy) {

  }

  ngAfterViewInit(): void {
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

  private enableUserActions() {
    const template = this.userRole;
    console.log(template)
    switch (template) {
      case UserRoles.EMPLOYEE:
        this.currentActionsTemplate = this.publicActionsTemplate;
        console.log('public')
        break;
      case UserRoles.SuperAdmin:
        this.currentActionsTemplate = this.superAdminActionsTemplate;
        break;
      case UserRoles.Admin:
        this.currentActionsTemplate = this.adminActionsTemplate;
        console.log('admin')
        break;
      case UserRoles.Sales:
        this.currentActionsTemplate = this.userActionsTemplate;
        console.log('user')
        break;
      default:
        this.currentActionsTemplate = this.publicActionsTemplate;
        console.log('default')
    }
  }

  handleGoBack() {
    this.location.back();
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
    this. userSubscription = this.userObservable.user$.subscribe((user) => {
      this.userRole = user?.role;
      console.log('changed',this.userRole)
      this.enableUserActions();
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
    this.route.navigateByUrl("/login");
    await this.userObservable.clearUser();
    this.ngAfterViewInit();
    this.collapseNavigation();
  }
  superAdminConfig: ButtonConfig[] = [
    usersButtonConfig,
    inventoryButtonConfig,
    productsButtonConfig,
    systemButtonConfig,
    locationButtonConfig
  ];
  adminConfig: ButtonConfig[] = [
    usersButtonConfig,
    inventoryButtonConfig,
    productsButtonConfig,
    systemButtonConfig,
    locationButtonConfig
  ]
  salesConfig: ButtonConfig[] = [
    inventoryButtonConfig,
    productsButtonConfig,
    shipmentButtonConfig
  ];
  publicConfig: ButtonConfig[] = [
  ];

  private tryAndSetUserOnReload() {
    this.userRole = this.userObservable.getUserSynchronously()?.role;
    this.cdRef.detectChanges();
  }

  handleOpenSettingsPage() {
    this.route.navigateByUrl('settings')
  }
}

export enum UserRoles {
  EMPLOYEE = 'employee',
  SuperAdmin = 'superAdmin',
  Admin = 'admin',
  Sales = 'sales',
}

