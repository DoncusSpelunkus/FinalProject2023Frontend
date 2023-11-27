import { Injectable } from '@angular/core';
import axios from 'axios';
import { MatSnackBar } from "@angular/material/snack-bar";
import {  catchError } from 'rxjs';
import { environment } from "src/enviroment";
import {CreateUserDTO, User} from 'src/entities/User';
import {UserObservable} from "./userObservable";



export const customAxios = axios.create({
  baseURL: environment.apiUrl + '/User',
  withCredentials: true,
})


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private matSnackbar: MatSnackBar,
              private userObservable: UserObservable) {
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

    customAxios.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth');
      if(token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }



  async getAllByWarehouse() {
    const warehouseId = this.userObservable.getUserSynchronously().warehouseId;
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
    await customAxios.delete('/Delete/' + employeeId).then(response => {
      return response;
    });
  }

  async createUser(createUserDTO: CreateUserDTO) {
    await customAxios.post('/register', createUserDTO).then(response => {
      return response;
    });
  }
}
