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
export class LoginServiceService {


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

  public async login(username: string, password: string) {
    const response = await customAxios.post('/login', {username, password}).then(response => {
      localStorage.setItem('auth', response.data);
      return response;
    });
  }

  public async register(username: string, password: string) {
    const response = await customAxios.post('/register', {username, password}).then(response => {
      localStorage.setItem('auth', response.data);
      return response;
    });
  }

}
