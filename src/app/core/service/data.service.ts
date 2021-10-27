import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import {Observable} from "rxjs";
import {Product} from "../../model/product";
import {Person} from "@angular/cli/utilities/package-json";
import {Rating} from "../../model/rating";
import {resolve} from "@angular/compiler-cli/src/ngtsc/file_system";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,
    private router: Router) {}


    register(data:any){
      console.log(JSON.stringify(data))
      return this.http.post(environment.serviceUrl+'registeruser.php', JSON.stringify(data)).pipe(
        map((res: any) => {
          return res;
        })
      )
    }

    login(data:any){
      console.log(JSON.stringify(data))
      return this.http.post(environment.serviceUrl+'login.php', JSON.stringify(data)).pipe(
        map((res: any) => {
          return res;
        })
      )
    }

    logout(){
    localStorage.setItem("isUserLoggedIn","false")
    }

    getProducts(category:string): Observable<Product[]>{
      console.log(environment.serviceUrl+'getproducts.php?category='+category)
      return this.http.get<Product[]>(environment.serviceUrl+'getproducts.php?category='+category)
    }

    getRating(product_id:string): Observable<Rating>{
    return this.http.get<Rating>(environment.serviceUrl+'getrating.php?product_id='+product_id)
    }

    getProductData(id:string): Observable<Product[]>{
    return  this.http.get<Product[]>(environment.serviceUrl+'getproductdata.php?product_id='+id)
    }


}
