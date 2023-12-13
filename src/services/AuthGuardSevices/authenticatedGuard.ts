import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { Token } from "src/entities/Token";
import {UserRoles} from "../../app/dashboard/dashboard.component";
import {inventoryButtonConfig, usersButtonConfig} from "../../constants/dashboard-actions";

@Injectable({
  providedIn: 'root'
})

export class AuthenticatedGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const localToken = localStorage.getItem('auth');

    if (!localToken) {
      return true;
    }

    const decodedToken = jwtDecode<Token>(localToken);
    const currentdate = new Date();

    console.log(decodedToken)

    if (decodedToken.exp && new Date(decodedToken.exp * 1000) > currentdate) {
      return this.handleRoleBasedNavigation(decodedToken.role);
    }
    return true;
  }

  private handleRoleBasedNavigation(role: string): boolean {
    switch (role) {
      case UserRoles.Admin:
        this.router.navigateByUrl(usersButtonConfig.routeLink)
        return false;
      case UserRoles.Sales:
        this.router.navigateByUrl(inventoryButtonConfig.childrenActions[0].actionLink);
        return false;
      case UserRoles.EMPLOYEE:
        this.router.navigateByUrl(inventoryButtonConfig.childrenActions[0].actionLink);
        return false;
      default:
        return false;
    }
  }
}
