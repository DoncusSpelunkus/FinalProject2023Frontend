import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { Token } from "src/entities/Token";
import {handleRoleBasedNavigation} from "../../util/role-based-actions";
import { AuthSelectors } from "src/app/states/auth/auth-selector";
import { Select } from "@ngxs/store";

@Injectable({
  providedIn: 'root'
})

export class UnauthenticatedAccessGuard implements CanActivate {
  @Select(AuthSelectors.getToken) token$: Observable<string>;
  constructor(private router: Router) {
  }

  canActivate(
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = "";
    this.token$.subscribe((data) => { // I dunno but this is the only way I could get the token from the store
      token = data;
    })
    

    if (token != "") {

      return true;
    }

    const decodedToken = jwtDecode<Token>(token);
    const currentdate = new Date();

    console.log(decodedToken)

    if (decodedToken.exp && new Date(decodedToken.exp * 1000) > currentdate) {
      return handleRoleBasedNavigation(decodedToken.role,this.router);
    }
    return true;
  }

}
