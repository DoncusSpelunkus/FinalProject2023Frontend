import { Injectable } from '@angular/core';
import {BrandDTO} from "../../entities/Brand";

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor() { }

  createBrand(createBrandDTO: BrandDTO) {
    console.error('not implemented yey',createBrandDTO);
  }
}
