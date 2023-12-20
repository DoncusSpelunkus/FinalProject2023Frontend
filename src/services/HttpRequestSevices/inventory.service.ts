import { Injectable } from '@angular/core';
import axios from 'axios';
import {MatSnackBar} from "@angular/material/snack-bar";
import { catchError } from 'rxjs';
import { environment } from "src/enviroment";

export const customAxios = axios.create({
  baseURL: environment.apiUrl,
  withCredentials: true,
})

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
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
      const token = localStorage.getItem('auth');
      if(token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async deleteItem(id: number, type: String): Promise<any> {
    try {
      const response = await customAxios.delete(type + '/Delete/' + id);
      return response;
    }
    catch(error) {
      throw error;
    }
  }

  async createItem(item: object, type: String): Promise<any> {
    try {
      const response = await customAxios.post(type +'/Create', item);
      return response;
    }
    catch(error) {
      throw error;
    }
  }

  async updateItem(item: object, type: String): Promise<any> {
    try {
      const response = await customAxios.put(type + '/Update', item);
      return response;
    }
    catch(error) {
      throw error;
    }
  }



}
