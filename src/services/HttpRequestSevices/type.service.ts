import { Injectable } from '@angular/core';
import {CreateBrandDTO} from "../../entities/Brand";
import axios from "axios";
import {environment} from "../../enviroment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserObservable} from "../HelperSevices/userObservable";
import {catchError} from "rxjs";

export const customAxios = axios.create({
  baseURL: environment.apiUrl + '/Type',
  withCredentials: true,
})

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private matSnackbar: MatSnackBar, private userObservable: UserObservable) {
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
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  createBrand(createBrandDTO: CreateBrandDTO) {
    console.error('not implemented yey',createBrandDTO);
  }

  async getTypesByWarehouse() {
    try {
      const response = await customAxios.get(`/GetByWarehouseId`);
      return response.data;
    }
    catch(error) {
      throw error;
    }
  }

  deleteBrand(typeId: number) {
    console.error('not implemented yey',typeId);
  }
}
