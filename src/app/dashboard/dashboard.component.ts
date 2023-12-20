import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ButtonConfig, DashboardCommunicationService } from "../../services/HelperSevices/dashboard-communication.service";
import { Observable, Subscription } from "rxjs";
import {
  inventoryButtonConfig, locationButtonConfig,
  productsButtonConfig, shipmentButtonConfig,
  systemButtonConfig,
  usersButtonConfig
} from "../../constants/dashboard-actions";
import { User } from 'src/entities/User';
import { Router } from '@angular/router';
import {LocationStrategy} from "@angular/common";
import { Select, Store } from '@ngxs/store';
import { AuthSelectors } from '../states/auth/auth-selector';
import { ClearUser } from '../states/auth/auth-action';

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

  @Select(AuthSelectors.getMe) userObservable$: Observable<User>;
  private subscription: Subscription = new Subscription();

  private actionSelectionSubscription: Subscription;
  private extendedActionClickSubscription: Subscription;

  async ngOnInit(): Promise<void> {
    await this.setupSubscriptions();
    this.tryAndSetUserOnReload();
    this.enableUserActions();
  }

  constructor(public communicationService: DashboardCommunicationService,
              private route: Router,
              private cdRef: ChangeDetectorRef,
              private location: LocationStrategy,
              private store: Store
              ) {

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
    switch (template) {
      case UserRoles.EMPLOYEE:
        this.currentActionsTemplate = this.publicActionsTemplate;
        break;
      case UserRoles.SuperAdmin:
        this.currentActionsTemplate = this.superAdminActionsTemplate;
        break;
      case UserRoles.Admin:
        this.currentActionsTemplate = this.adminActionsTemplate;
        break;
      case UserRoles.Sales:
        this.currentActionsTemplate = this.userActionsTemplate;
        break;
      default:
        this.currentActionsTemplate = this.publicActionsTemplate;
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
    await this.subscription.add(
      this.userObservable$.subscribe(
        (user: User) => {
          this.userRole = user?.role;
          this.enableUserActions();
        })
    );
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
    this.store.dispatch(new ClearUser());
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
    this.userObservable$.subscribe((user) => {
      this.userRole = user.role;
    });
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

