import { Injectable } from '@angular/core';
import axios from 'axios';
import { MatSnackBar } from "@angular/material/snack-bar";
import {  Observable, catchError } from 'rxjs';
import { environment } from "src/enviroment";
import {CreateUserDTO, User} from 'src/entities/User';
import { UserStore } from 'src/stores/user.store';
import {ChangePasswordDTO} from "../../entities/PasswordConfirmation";
import { Select } from '@ngxs/store';
import { AuthSelectors } from 'src/app/states/auth/auth-selector';


export const customAxios = axios.create({
  baseURL: environment.apiUrl + '/User',
  withCredentials: true,
})


@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  @Select(AuthSelectors.getToken) token$: Observable<string>;

  constructor(private matSnackbar: MatSnackBar,
              private userStore: UserStore) {
    this.setupSnackBar();
  }


  //TODO call this inside the loader
  async getAllByWarehouse() {
    let response = await customAxios.get('/GetAllByWarehouseId/');

    let users: User[] = response.data.map((any: any) => {
      const user = new User();
      Object.assign(user, any);
      return user;
    });
    this.userStore.setUsers = users;
  }

  async getByEmployeeId(employeeId: number): Promise<User> {
    try {
      const response = await customAxios.get('/GetById/' + employeeId)
      return response.data;
    }
    catch(error) {
      throw error;
    }
  }

  async updateEmployee(employee: any) {
    await customAxios.put('/Update', employee).then(response => {
      return response;
    });
  }

  async deleteEmployee(employeeId: number) {
    await customAxios.delete('/Delete/' + employeeId).then(response => {
      this.userStore.deleteEmployee(employeeId);
      return response
    });
  }

  async createUser(createUserDTO: CreateUserDTO) {
    await customAxios.post('/register', createUserDTO).then(response => {
      this.userStore.createUser(response);
      return response;
    });
  }

  private setupSnackBar() {
    customAxios.interceptors.response.use(
      response => {
        if (response.status == 201 || response.status == 200) {
          this.matSnackbar.open("Great success", "x", { duration: 2000 })
        }
        return response;
      }, rejected => {
        if (rejected.response.status >= 400 && rejected.response.status <= 500) {
          this.matSnackbar.open(rejected.response.data, "x", { duration: 2000 });
        }
        catchError(rejected);
      }
    )

    customAxios.interceptors.request.use((config) => {
      this.token$.subscribe((data) => {
        config.headers.Authorization = `Bearer ${data}`;
      })
      return config;
    });
  }

  changeUserPassword(dto: ChangePasswordDTO) {
    //TODO implement call to endpoint
  }
}
