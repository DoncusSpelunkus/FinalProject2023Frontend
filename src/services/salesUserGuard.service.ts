import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { jwtDecode } from "jwt-decode";

@Injectable({
    providedIn: 'root'
})

export class SalesGuardService implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let localToken = localStorage.getItem('auth');
        if (localToken) { // checks if the local token exist at all
            let decodToken = jwtDecode(localToken) as Token;
            let currentdate = new Date();
            if (decodToken.exp) {
                let expiry = new Date(decodToken.exp * 1000);
                if (currentdate < expiry && decodToken.role === ("Admin" || "Sales") ) { // checks the role assigned to the token and exp date
                    return true;
                }
                else if (currentdate < expiry && decodToken.role === "User")
                    this.router.navigateByUrl("warehouse") // Redirects if the token has a user role
                return false;
            }
        }
        return false;
    }
}

class Token { // a small expression of the token
    exp?: number;
    role?: string;
}