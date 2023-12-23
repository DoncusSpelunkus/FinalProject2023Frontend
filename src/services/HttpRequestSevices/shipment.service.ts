import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';
import { environment } from 'src/enviroment';
import axios from 'axios';
import {AddToShipmentDetails, Shipment, ShipmentDetail} from 'src/entities/Shipment';


export const customAxios = axios.create({
  baseURL: environment.apiUrl + '/Shipment',
  withCredentials: true,
})

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  constructor(private matSnackbar: MatSnackBar) {

    customAxios.interceptors.response.use(
      response => {
        if(response.status == 201 || response.status == 200)  {
          this.matSnackbar.open("Great success", "x", { duration: 2000 })
        }
        return response;
      }, rejected => {
        if (rejected.response.status >= 400 && rejected.response.status <= 500) {
          matSnackbar.open(rejected.response.data, "x", { duration: 2000 });
        }
        catchError(rejected);
      }
    )

    customAxios.interceptors.request.use((config) => {
      let state = localStorage.getItem("Auth") // to avoid circular dependency
      if(state != null){
            JSON.parse(state).token != null ? config.headers.Authorization = `Bearer ${JSON.parse(state).token}` : null
      }
      return config;
    });
  }


  // Shipment specific

  async getShipment(id: number): Promise<Shipment> {
    try {
      const response = await customAxios.get('/GetByShipmentId/' + id)
      return response.data;
    }
    catch (error) {
      throw error;
    }
  }

  async createShipment(shipment: Shipment) {
    try {
      const response = await customAxios.post('/Create', shipment)
      return response.data;
    }
    catch (error) {
      throw error;
    }
  }

  async deleteShipment(id: number) {
    try {
      const response = await customAxios.delete('/Delete/' + id)
      return response.data;
    }
    catch (error) {
      throw error;
    }
  }

  // Detail specific

  async addToShipment(shipmentId: number, shipmentDetail: AddToShipmentDetails) {
    try {
      const response = await customAxios.put('/AddToShipment/' + shipmentId, shipmentDetail);
      return response.data;
    }
    catch (error) {
      throw error;
    }
  }

  async removeFromShipment(shipmentId, shipmentDetailIds) {
    try {
      const response = await customAxios.patch('/RemoveFromShipment/' + shipmentId, shipmentDetailIds);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async changeQuantity(shipmentId: number, shipmentDetailId: number, quantity: number) {
    try {
      const response = await customAxios.post('/ChangeQuantity/' + shipmentId + '/' + shipmentDetailId + '/' + quantity);
      return response.data;
    }
    catch (error) {
      throw error;
    }
  }





}
