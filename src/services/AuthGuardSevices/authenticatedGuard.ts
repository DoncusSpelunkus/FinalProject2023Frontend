import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Token } from "src/entities/Token";
import { jwtDecode } from "jwt-decode";
import { AuthSelectors } from "src/app/states/auth/auth-selector";
import { Select } from "@ngxs/store";

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  @Select(AuthSelectors.getToken) token$: Observable<string>;
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = "";
    this.token$.subscribe((data) => { // I dunno but this is the only way I could get the token from the store
      token = data;
    })

    if (!token) {
      this.navigateToLogin();
      return false;
    }

    try {
      const decodedToken = jwtDecode<Token>(token);
      const currentdate = new Date();
      console.log(decodedToken)
      if (decodedToken.exp && new Date(decodedToken.exp * 1000) > currentdate) {
        console.log("Token is valid");
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
