import {User} from "../entities/User";
import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

@Injectable({
  providedIn: 'root'
})
export class UserStore {

  private usersSubject = new BehaviorSubject<User[]>([]);
  private users$ = this.usersSubject.asObservable();

  set setUsers(users: User[]) {
    this.usersSubject.next(users);
  }

  get getUsers() {
    return this.users$;
  }

  deleteEmployee(employeeId: any) {
    const currentEmployeeList = this.usersSubject.value;
    const updatedEmployeeList = currentEmployeeList.filter(user => user.employeeId != employeeId);
    this.usersSubject.next(updatedEmployeeList)
  }

  createUser(response: any) {
    const user = response.data;
    const employeeList = this.usersSubject.value;
    employeeList.push(user)
    this.usersSubject.next(employeeList)
  }
}
