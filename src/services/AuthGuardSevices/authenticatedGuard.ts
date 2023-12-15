import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Token } from "src/entities/Token";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const localToken = localStorage.getItem('auth');

    if (!localToken) {
      this.navigateToLogin();
      return false;
    }

    try {
      const decodedToken = jwtDecode<Token>(localToken);
      const currentdate = new Date();

      if (decodedToken.exp && new Date(decodedToken.exp * 1000) > currentdate) {
        return true; // The token is valid
      }
    } catch (error) {
      console.error("Token decoding failed", error);
    }

    this.navigateToLogin();
    return false;
  }

  private navigateToLogin(): void {
    this.router.navigateByUrl("/login");  // Redirect to your login route
  }
}
