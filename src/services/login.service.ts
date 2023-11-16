import { Injectable } from '@angular/core';
import axios from 'axios';
import {MatSnackBar} from "@angular/material/snack-bar";
import { BehaviorSubject, catchError } from 'rxjs';
import { environment } from "src/enviroment";
import {CreateUserDTO, User} from 'src/entities/User';
import { jwtDecode } from 'jwt-decode';
import { UserObservable } from './userObservable';

export const customAxios = axios.create({
  baseURL: environment.apiUrl + '/User',
  withCredentials: true,
})

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private matSnackbar: MatSnackBar, private userObservable: UserObservable) {
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

    customAxios.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth');
      if(token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async login(username: string, password: string) {
    const dto = {
      "username": username,
      "password": password,
      "warehouseid": 1
    }
    const response = await customAxios.post('/login', dto).then(response => {
      localStorage.setItem('auth', response.data.token);
      const { token, ...userData } = response.data;
      const user = new User();
      Object.assign(user, userData);
      this.userObservable.setUser(user);
      return;
    });
  }

  async register(username: string, password: string) {
    const response = await customAxios.post('/register', {username, password}).then(response => {
      localStorage.setItem('auth', response.data);
      return;
    });
  }

  async createUser(createUserDTO: CreateUserDTO) {
    const response = await customAxios.post('/register', createUserDTO).then(response => {
      return;
    });
  }

}
