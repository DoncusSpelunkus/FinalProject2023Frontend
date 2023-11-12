import { Injectable } from '@angular/core';
import axios from 'axios';
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, catchError } from 'rxjs';
import { environment } from "src/enviroment";
import { User } from 'src/entities/User';
import { jwtDecode } from 'jwt-decode';
import { Token } from 'src/entities/dashboardRole';


export const customAxios = axios.create({
  baseURL: environment.apiUrl + '/User',
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('auth')}`
  }
})


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private matSnackbar: MatSnackBar) {
    customAxios.interceptors.response.use(
      response => {
        if (response.status == 201) {
          this.matSnackbar.open("Great success", "x", { duration: 1000 })
        }
        return response;
      }, rejected => {
        if (rejected.response.status >= 400 && rejected.response.status <= 500) {
          matSnackbar.open(rejected.response.data, "x", { duration: 1000 });
        }
        catchError(rejected);
      }
    )
  }

  async getAllByWarehouse(warehouseId: number) {
    let response = await customAxios.get('/GetAllByWarehouseId/' + warehouseId);

    let users: User[] = response.data.map((any: any) => {
      const user = new User();
      user.Name = any.name;
      user.Username = any.username;
      user.Role = any.role;
      user.Email = any.email;
      return user;
    });

    return users;
  }

  async getByEmployeeId(employeeId: number) {
    await customAxios.get('/GetEmployeeById' + employeeId).then(response => {
      return response;
    });
  }

  async updateEmployee(employee: any) {
    await customAxios.put('/UpdateEmployee', employee).then(response => {
      return response;
    });
  }

  async deleteEmployee(employeeId: number) {
    await customAxios.delete('/DeleteEmployee/' + employeeId).then(response => {
      return response;
    });
  }

  async getCurrentUser() {
    let token = localStorage.getItem('auth');
    if (token) {
      let decoded = jwtDecode(token) as Token;
      let response = await customAxios.get('/GetById/' + decoded.id);
      let user = new User();
      user.Name = response.data.name;
      user.Username = response.data.username;
      user.Role = response.data.role;
      user.Email = response.data.email;
      this.setUser(user);
    }
  }

  async setUser(user: User) {
    this.userSubject.next(user);
  }
}
