import { Injectable } from '@angular/core';
import {BrandDTO} from "../../entities/Brand";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor() { }

  createBrand(createBrandDTO: BrandDTO) {
    console.error('not implemented',createBrandDTO)
  }
}
