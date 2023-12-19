import { Injectable } from '@angular/core';
import axios, { Axios, AxiosError } from 'axios';
import {environment} from "../../enviroment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError} from "rxjs";

export const customAxios = axios.create({
  baseURL: environment.apiUrl + '/Location',
  withCredentials: true,
})

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private matSnackbar: MatSnackBar) {
    this.setupSnackBar();
  }

  private setupSnackBar() {
    customAxios.interceptors.response.use(
      response => {
        if(response.status == 201 || response.status == 200) {
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
      const token = localStorage.getItem('auth');
      if(token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async getLocationsInWarehouse(): Promise<any> {
    return customAxios.get('/GetAllByWarehouse/').then((response) => {
      return response;
    })
  }
}
