import { Injectable } from '@angular/core';
import axios from 'axios';
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError } from 'rxjs';
import { environment } from "src/enviroment";
import { ChangePasswordDTO } from 'src/entities/ChangePasswordDTO';

export const customAxios = axios.create({
  baseURL: environment.apiUrl + '/User',
  withCredentials: true,
})

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private matSnackbar: MatSnackBar) {
    customAxios.interceptors.response.use(
      response => {
        if(response.status == 201 || response.status == 200)  {
          this.matSnackbar.open("Great success", "x", { duration: 5000 })
        }
        return response;
      }, rejected => {
        if (rejected.response.status >= 400 && rejected.response.status <= 500) {
          matSnackbar.open(rejected.response.data, "x", { duration: 5000 });
        }
        catchError(rejected);
      }
    )

    customAxios.interceptors.request.use((config) => {
      let state = localStorage.getItem("Auth") // to avoid circular dependency
      if(state != null){
            JSON.parse(state).token != null ? config.headers.Authorization = `Bearer ${JSON.parse(state).token}` : null
      }
      return config;
    });
  }

  async login(username: string, password: string): Promise<String> {
    const dto = {
      "username": username,
      "password": password,
      "warehouseid": 1
    }
    try {
      const response = await customAxios.post('/login', dto)
      return response.data;
    }
    catch (error) {
      throw error;
    }
  }

  async register(username: string, password: string) {
    const response = await customAxios.post('/register', { username, password }).then(response => {
      localStorage.setItem('auth', response.data);
      return;
    });
  }

  async UpdatePassword(dto: ChangePasswordDTO) {
    await customAxios.patch('/PasswordUpdate',dto).then(response => {
      return response;
    }
    );
  }

}
