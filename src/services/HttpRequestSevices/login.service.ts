import { Injectable } from '@angular/core';
import axios from 'axios';
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError } from 'rxjs';
import { environment } from "src/enviroment";

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
          this.matSnackbar.open("Great success", "x", { duration: 2000 })
        }
        return response;
      }, rejected => {
        if (rejected.response.status >= 400 && rejected.response.status <= 500) {
          matSnackbar.open(rejected.response.data, "x", { duration: 2000 });
        }
        catchError(rejected);
      }
    )

    customAxios.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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
      console.log(response.data.token)
      return response.data.token;
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

}
