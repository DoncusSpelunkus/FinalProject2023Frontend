import { Injectable } from '@angular/core';
import axios, { Axios, AxiosError } from 'axios';
import {environment} from "../../enviroment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserObservable} from "../HelperSevices/userObservable";
import {catchError} from "rxjs";
import {Location} from "../../entities/Inventory";

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
    const warehouseId = this.userObservable.getUserSynchronously().warehouseId
    return customAxios.get('/GetAllByWarehouse/'+warehouseId).then((response) => {
      return response;
    })
  }

  async createSingleLocation(locationDTO: Location) {
    try {
      const response = await customAxios.post('/Create',locationDTO);
      return response;
    }
    catch(error) {
      throw error;
    }
  }

  async createLocationBatch(locationDTO: Location) {
    try {
      const response = await customAxios.post('/createBatch',locationDTO);
      return response;
    }
    catch(error) {
      throw error;
    }
  }
}
