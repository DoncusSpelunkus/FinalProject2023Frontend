import { Injectable } from '@angular/core';
import axios from 'axios';
import {MatSnackBar} from "@angular/material/snack-bar";
import { catchError } from 'rxjs';
import { environment } from "src/enviroment";

export const customAxios = axios.create({
  baseURL: environment.apiUrl + '/User',
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
        if(response.status == 201) {
          this.matSnackbar.open("Great success", "x", {duration: 1000})
        }
        return response;
      }, rejected => {
        if(rejected.response.status>=400 && rejected.response.status <= 500) {
          matSnackbar.open(rejected.response.data, "x", {duration: 1000});
        }
        catchError(rejected);
      }
    )
  }

  private async getAllByWarehouse(warehouseId: number) {
    await customAxios.get('/GetAllByWarehouseId/' + warehouseId).then(response => {
      return response;
    });
  }

  private async getByEmployeeId(employeeId: number) {
    await customAxios.get('/GetEmployeeById' + employeeId).then(response => {
      return response;
    });
  }
  
  private async updateEmployee(employee: any) {
    await customAxios.put('/UpdateEmployee', employee).then(response => {
      return response;
    });
  }

  private async deleteEmployee(employeeId: number) {
    await customAxios.delete('/DeleteEmployee/' + employeeId).then(response => {
      return response;
    });
  }

}
