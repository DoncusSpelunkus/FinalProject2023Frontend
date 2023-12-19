import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { jwtDecode } from "jwt-decode";
import { Token } from "src/entities/Token";
import {UserRoles} from "../../app/dashboard/dashboard.component";
import { Select } from "@ngxs/store";
import { AuthSelectors } from "src/app/states/auth/auth-selector";

@Injectable({
    providedIn: 'root'
})

export class AdminGuardService implements CanActivate {
    @Select(AuthSelectors.getToken) token$: Observable<string>;

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let token = "";
        this.token$.subscribe((data) => { // I dunno but this is the only way I could get the token from the store
            token = data;
        })

        if (token) { // checks if the local token exist at all
            let decodToken = jwtDecode(token) as Token;
            console.log(decodToken.role)
            let currentdate = new Date();
            if (decodToken.exp) {
                let expiry = new Date(decodToken.exp * 1000);
                if (currentdate < expiry && decodToken.role === UserRoles.Admin) { // checks the role assigned to the token and exp date
                    return true;
                }
                else if (currentdate < expiry && decodToken.role === "employee")
                    this.router.navigateByUrl("warehouse") // Redirects if the token has a user role
                return false;
            }
        }
        return false;
    }
}
