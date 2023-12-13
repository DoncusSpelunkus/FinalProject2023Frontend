import {UserRoles} from "../app/dashboard/dashboard.component";
import {inventoryButtonConfig, usersButtonConfig} from "../constants/dashboard-actions";
import {Router} from "@angular/router";

export const handleRoleBasedNavigation = (role: string,router: Router): boolean => {
  switch (role) {
    case UserRoles.Admin:
      router.navigateByUrl(usersButtonConfig.routeLink)
      return false;
    case UserRoles.Sales:
      router.navigateByUrl(inventoryButtonConfig.childrenActions[0].actionLink);
      return false;
    case UserRoles.EMPLOYEE:
      router.navigateByUrl(inventoryButtonConfig.childrenActions[0].actionLink);
      return false;
    default:
      return false;
  }
}
