import { Injectable } from '@angular/core';
import {CreateBrandDTO} from "../../entities/Brand";
import axios from "axios";
import {environment} from "../../enviroment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable, catchError} from "rxjs";
import {CreateTypeDTO, Type} from "../../entities/Inventory";
import { AuthSelectors } from 'src/app/states/auth/auth-selector';
import { Select } from '@ngxs/store';

export const customAxios = axios.create({
  baseURL: environment.apiUrl + '/Type',
  withCredentials: true,
})

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  @Select(AuthSelectors.getToken) token$: Observable<string>;

  constructor(private matSnackbar: MatSnackBar) {
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
      this.token$.subscribe((data) => { 
        config.headers.Authorization = `Bearer ${data}`;
      })
      return config;
    });
  }

  async createBrand(createBrandDTO: CreateTypeDTO) {
    try {
      const response = await customAxios.post(`/Create`,createBrandDTO);
      return response.data;
    }
    catch(error) {
      throw error;
    }
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

  async deleteType(typeId: number) {
    try {
      const response = await customAxios.delete(`/Delete/${typeId}`);
      return response.data;
    }
    catch(error) {
      throw error;
    }
  }
}
