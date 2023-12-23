import { Injectable } from '@angular/core';
import axios from 'axios';
import {MatSnackBar} from "@angular/material/snack-bar";
import { Observable, catchError } from 'rxjs';
import { environment } from "src/enviroment";
import { Select } from '@ngxs/store';
import { AuthSelectors } from 'src/app/states/auth/auth-selector';
import {Location, MoveQuantityDTO} from 'src/entities/Inventory';

export const customAxios = axios.create({
  baseURL: environment.apiUrl,
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

  async deleteItem(id: any, type: String): Promise<any> {
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

  async createLocationBatch(locationDTO: Location): Promise<any> {
    try {
      const response = await customAxios.post('Location/createBatch',locationDTO);
      return response;
    }
    catch(error) {
      throw error;
    }
  }


  async moveQuantity(payload: MoveQuantityDTO) {
    try {
      const response = await customAxios.patch('ProductLocation/MoveQuantity',payload);
      return response;
    }
    catch(error) {
      throw error;
    }
  }
}
