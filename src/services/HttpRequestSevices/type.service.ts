import { Injectable } from '@angular/core';
import {CreateBrandDTO} from "../../entities/Brand";

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor() { }

  createBrand(createBrandDTO: CreateBrandDTO) {
    console.error('not implemented yey',createBrandDTO);
  }
}
