import { Injectable } from '@angular/core';
import axios from 'axios';
import {MatSnackBar} from "@angular/material/snack-bar";
import { Observable, catchError } from 'rxjs';
import { environment } from "src/enviroment";
import { Select } from '@ngxs/store';
import { AuthSelectors } from 'src/app/states/auth/auth-selector';

export const customAxios = axios.create({
  baseURL: environment.apiUrl + '/Product',
  withCredentials: true,
})

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  
  @Select(AuthSelectors.getToken) token$: Observable<string>;

  constructor(private matSnackbar: MatSnackBar) {
    customAxios.interceptors.response.use(
      response => {
        if(response.status == 201 || response.status == 200) {
          this.matSnackbar.open("Great success", "x", {duration: 2000})
        }
        return response;
      }, rejected => {
        if(rejected.response.status>=400 && rejected.response.status <= 500) {
          matSnackbar.open(rejected.response.data, "x", {duration: 2000});
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

  async deleteItem(id: number, type: String): Promise<any> {
    try {
      const response = await customAxios.delete('/Delete/' + type + '/' + id);
      return response;
    }
    catch(error) {
      throw error;
    }
  }

  async createItem(item: object, type: String): Promise<any> {
    try {
      const response = await customAxios.post('/Create/' + type, item);
      return response;
    }
    catch(error) {
      throw error;
    }
  }

  async updateItem(item: object, type: String): Promise<any> {
    try {
      const response = await customAxios.put('/Update/' + type, item);
      return response;
    }
    catch(error) {
      throw error;
    }
  }



}
