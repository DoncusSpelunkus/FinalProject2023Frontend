import { Injectable } from "@angular/core";
import axios from "axios";
import { environment } from "src/enviroment";


export const customAxios = axios.create({
    baseURL: environment.apiUrl + '/Product',
    withCredentials: true,
  })

  @Injectable({
    providedIn: 'root'
})
export class LogService {
    constructor() { }

    

}