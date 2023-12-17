import {User} from "../entities/User";
import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Brand} from "../entities/Brand";

@Injectable({
  providedIn: 'root'
})
export class BrandStore {

  private brandSubject = new BehaviorSubject<Brand[]>([]);
  private brands$ = this.brandSubject.asObservable();

  set setBrands(brands: Brand[]) {
    this.brandSubject.next(brands);
  }

  get getBrands() {
    return this.brands$;
  }

  deleteBrand(brandId: any) {
    const currentBrandList = this.brandSubject.value;
    const updatedEmployeeList = currentBrandList.filter(brand => brand.BrandId != brandId);
    this.brandSubject.next(updatedEmployeeList)
  }

  createBrand(response: any) {
    const brand = response.data;
    const brandList = this.brandSubject.value;
    brandList.push(brand)
    this.brandSubject.next(brandList)
  }
}
