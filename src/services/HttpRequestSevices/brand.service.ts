import { Injectable } from '@angular/core';
import {CreateBrandDTO} from "../../entities/Brand";
import axios from 'axios';
import {environment} from "../../enviroment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable, catchError} from "rxjs";
import {BrandStore} from "../../stores/brand.store";
import { Select } from '@ngxs/store';
import { AuthSelectors } from 'src/app/states/auth/auth-selector';

export const customAxios = axios.create({
  baseURL: environment.apiUrl + '/Brand',
  withCredentials: true,
})

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  @Select(AuthSelectors.getToken) token$: Observable<string>;
  
  constructor(private matSnackbar: MatSnackBar,
              private brandStore: BrandStore) {
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
      this.token$.subscribe((data) => {
        config.headers.Authorization = `Bearer ${data}`;
      })
      return config;
    });
  }

  async createBrand(createBrandDTO: CreateBrandDTO) {
    try {
      const response = await customAxios.post(`/Create`,createBrandDTO);
      this.brandStore.createBrand(response);
      return response;
    }
    catch(error) {
      throw error;
    }
  }

  async deleteBrand(brandId: number) {
    try {
      const response = await customAxios.delete(`/Delete/${brandId}`);
      this.brandStore.deleteBrand(brandId);
      return response;
    }
    catch(error) {
      throw error;
    }
  }

  async getBrandsByWarehouse() {
    try {
      const response = await customAxios.get(`/GetByWarehouseId/`);
      this.brandStore.setBrands = response.data;
      return response;
    }
    catch(error) {
      throw error;
    }
  }
}
