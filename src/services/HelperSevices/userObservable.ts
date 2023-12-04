import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { User } from "src/entities/User";

@Injectable({
    providedIn: 'root'
})

export class UserObservable {
    private userSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    user$ = this.userSubject.asObservable();

    constructor() {
        console.log("UserObservable created");
    }

    public async setUser(user: User) {
        this.userSubject.next(user);
        this.saveUserToStorage(user);
    }

    private getUserFromStorage(): User {
        const storedUser = sessionStorage.getItem('currentUser');
        let user = new User();
        if(storedUser) {
            Object.assign(user, JSON.parse(storedUser));
            return user;
        }
        return user;
    }

    public async clearUser() {
        this.userSubject.next(null);
        localStorage.removeItem('auth');
        localStorage.removeItem('currentUser');
    }

    private saveUserToStorage(user: User) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    public getUserSynchronously(){
      const storedUser = localStorage.getItem('currentUser');
      let user = new User();
      if(storedUser) {
        Object.assign(user, JSON.parse(storedUser));
        return user;
      }
      return user;
    }
}
