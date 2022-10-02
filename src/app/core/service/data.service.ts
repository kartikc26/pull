import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable, ReplaySubject } from "rxjs";
import { Product } from "../../model/product";
import { Person } from "@angular/cli/utilities/package-json";
import { Rating } from "../../model/rating";
import { resolve } from "@angular/compiler-cli/src/ngtsc/file_system";
import { StringMappingType } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _prodImageCount!: number
  private _prodTextCount!: number

  constructor(private http: HttpClient,
    private router: Router) { }


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

  register(data: any) {
    console.log(JSON.stringify(data))
    return this.http.post(environment.serviceUrl + 'registeruser.php', JSON.stringify(data)).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  login(data: any) {
    console.log(JSON.stringify(data))
    return this.http.post(environment.serviceUrl + 'login.php', JSON.stringify(data)).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  logout() {
    localStorage.setItem("isUserLoggedIn", "false")
  }

  validateUser(data:any){
    let promise = new Promise((resolve, reject) => {
      this.http.post(environment.serviceUrl + 'validateuser.php', JSON.stringify(data)).toPromise()
        .then(
          res => {
            resolve(res)
          }
        )
        .catch(
          msg => [
            reject(msg)
          ]
        )
    });
    return promise
  }

  getProducts(category: string): Observable<Product[]> {
    console.log(environment.serviceUrl + 'getproducts.php?category=' + category)
    return this.http.get<Product[]>(environment.serviceUrl + 'getproducts.php?category=' + category)
  }

  getRating(product_id: string): Observable<Rating> {
    return this.http.get<Rating>(environment.serviceUrl + 'getrating.php?product_id=' + product_id)
  }

  getProductData(id: string): Observable<Product[]> {
    return this.http.get<Product[]>(environment.serviceUrl + 'getproductdata.php?product_id=' + id)
  }

  upload(file: File, idx: number, path:string) {

    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('path', path);
    const req = new HttpRequest('POST', `${environment.serviceUrl}uploadcustom.php`, formData, {
      // reportProgress: true,
      responseType: 'json'
    });
    console.log(req)

    let promise = new Promise((resolve, reject) => {
      this.http.request(req).toPromise()
        .then(
          res => {
            resolve(res)
          }
        )
        .catch(
          msg => [
            reject(msg)
          ]
        )
    });
    return promise
  }

  clearDir() {
    // return this.http.post(environment.serviceUrl+'clearDir.php', JSON.stringify('images/'+localStorage.getItem('uid')+'/cart/'+localStorage.getItem('pid')+'/')).pipe(
    //   map((res: any) => {
    //     return res;
    //   }))

    let promise = new Promise((resolve, reject) => {
      this.http.post(environment.serviceUrl + 'clearDir.php', JSON.stringify('images/' + localStorage.getItem('uid') + '/cart/' + localStorage.getItem('pid') + '/')).toPromise()
        .then(
          res => {
            resolve(res)
          }
        )
        .catch(
          msg => [
            reject(msg)
          ]
        )
    });
    return promise
  }

  addToWishlist(data: any) {
    let cart:string
      return this.fetchCart().toPromise().then((res:any)=>{
        if(res!=null && res.toString().length>2){
          console.log(res)
          cart = data.pid + "~" + res.cart.toString()
          data.cart = cart
        }
        this.updateWishlist(data).then(res=>console.log(res)).catch(err=>console.log(err))
        });
  }

  fetchWishlist() {
    // let promise = new Promise((resolve, reject) => {
      return this.http.post(environment.serviceUrl + 'fetchwishlist.php', JSON.stringify({'email':localStorage.getItem('uid')}))
    //   .toPromise()
    //     .then(res => { resolve(res) })
    //     .catch(msg => [reject(msg)])
    // });
    // return promise
  }

  updateWishlist(data:any){
    console.log(data)
    let promise = new Promise((resolve, reject) => {
    this.http.post(environment.serviceUrl + 'updatewishlist.php', JSON.stringify(data)).toPromise()
      .then(res => { resolve(res) })
      .catch(msg => [reject(msg)])
    });
    return promise
  }

  deleteFromWishlist(pid:String){
    let cart:string
    return this.fetchCart().toPromise().then((res:any)=>{
      console.log(res)
      if(res!=null && res.toString().length>2){
        console.log(res)
        cart = res.cart.toString().replace(pid+'~','')
        console.log(cart)
        this.updateWishlist({'email':localStorage.getItem('uid'), 'cart':cart}).then(res=>console.log(res)).catch(err=>console.log(err))
      }else{
        console.log('already empty')
      }
    })

  }


  addToCart(data: any) {
    console.log(data)
    let promise = new Promise((resolve, reject) => {
    this.http.post(environment.serviceUrl + 'addtocart.php', JSON.stringify(data)).toPromise()
      .then(res => { resolve(res) })
      .catch(msg => [reject(msg)])
    });
    return promise
  }

  fetchCart() {
    // let promise = new Promise((resolve, reject) => {
      return this.http.post(environment.serviceUrl + 'fetchcart.php', JSON.stringify({'email':localStorage.getItem('uid')}))
    //   .toPromise()
    //     .then(res => { resolve(res) })
    //     .catch(msg => [reject(msg)])
    // });
    // return promise
  }

  deleteFromCart(pid:String){
    

  }





}
