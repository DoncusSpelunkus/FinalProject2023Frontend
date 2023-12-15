import { Injectable } from '@angular/core';
import axios, { Axios, AxiosError } from 'axios';
import {environment} from "../../enviroment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserObservable} from "../HelperSevices/userObservable";
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
    private matSnackbar: MatSnackBar,
    private userObservable: UserObservable) {
    this.setupSnackBar();
  }

  private setupSnackBar() {
    customAxios.interceptors.response.use(
      response => {
        if (response.status == 201) {
          this.matSnackbar.open("Great success", "x", { duration: 1000 })
        }
        return response;
      }, rejected => {
        if (rejected.response.status >= 400 && rejected.response.status <= 500) {
          this.matSnackbar.open(rejected.response.data, "x", { duration: 1000 });
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
    const warehouseId = this.userObservable.getUserSynchronously().warehouseId
    return customAxios.get('/GetAllByWarehouse/'+warehouseId).then((response) => {
      return response;
    })
  }
}