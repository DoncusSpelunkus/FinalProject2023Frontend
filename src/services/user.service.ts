import { Injectable } from '@angular/core';
import axios from 'axios';
import { MatSnackBar } from "@angular/material/snack-bar";
import {  catchError } from 'rxjs';
import { environment } from "src/enviroment";
import { User } from 'src/entities/User';



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
      Object.assign(user, any);
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
}
