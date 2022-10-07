import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _prodImageCount!: number
  private _prodTextCount!: number

  constructor(private http: HttpClient) { }

  get prodImageCount(): number {
    return this._prodImageCount;
  }

  set prodImageCount(value: number) {
    this._prodImageCount = value;
    localStorage.setItem("prodImageCount", String(value));
  }

  get prodTextCount(): number {
    return this._prodTextCount;
  }

  set prodTextCount(value: number) {
    this._prodTextCount = value;
    localStorage.setItem("prodTextCount", String(value));
  }

  getProducts(category: string): Observable<Product[]> {
    console.log(environment.serviceUrl + 'getproducts.php?category=' + category)
    return this.http.get<Product[]>(environment.serviceUrl + 'getproducts.php?category=' + category)
  }

  getProductData(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(environment.serviceUrl + 'getproductdata.php?product_id=' + id)
  }

  getMultipleProductData(ids: string): Observable<Product[]> {
    return this.http.get<Product[]>(environment.serviceUrl + 'getmultipleproductdata.php?product_ids=' + ids)
  }
}
