import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { Product } from 'src/app/model/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  private _cart: Cart[] = [];
  public get cart(): Cart[] {
    return this._cart;
  }
  public set cart(value: Cart[]) {
    this._cart = value;
  }
  private _products: Product[] = [];
  public get products(): Product[] {
    return this._products;
  }
  public set products(value: Product[]) {
    this._products = value;
  }
  private _subtotal: number = 0;
  private _shipping: number = 0;
  public get shipping(): number {
    return this._shipping;
  }
  public set shipping(value: number) {
    this._shipping = value;
  }
  private _newUserDiscount: number = 0;
  public get newUserDiscount(): number {
    return this._newUserDiscount;
  }
  public set newUserDiscount(value: number) {
    this._newUserDiscount = value;
  }
  private _couponDiscount: number = 0;
  public get couponDiscount(): number {
    return this._couponDiscount;
  }
  public set couponDiscount(value: number) {
    this._couponDiscount = value;
  }
  private _total: number = 0;



  getCartSubtotal() {
    let price = 0;
    let discount = 0;
    this._subtotal = 0;
    this.cart.forEach(item => {
      price = parseInt(<string>this.products.filter(i => { return i.product_id == item.product_id })[0].price.split("~")[parseInt(<string>item.product_size)])
      discount = price * this.products.filter(i => { return i.product_id == item.product_id })[0].discount / 100
      this._subtotal += price - discount
    })
    return this._subtotal
  }

  getCartTotal(){
    this._total = this._subtotal + this.shipping - this.newUserDiscount - this.couponDiscount
    if(this._total<0){
      this._total = 0
    }
    return this._total
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
    return this.http.post(environment.serviceUrl + 'fetchcart.php', JSON.stringify({ 'email': localStorage.getItem('uid') }))
    //   .toPromise()
    //     .then(res => { resolve(res) })
    //     .catch(msg => [reject(msg)])
    // });
    // return promise
  }

  deleteFromCart(timesta: string, path: string) {
    let promise = new Promise((resolve, reject) => {
      this.http.post(environment.serviceUrl + 'deletecart.php', JSON.stringify({ 'timesta': timesta, 'path': path })).toPromise()
        .then(res => { resolve(res) })
        .catch(msg => [reject(msg)])
    });
    return promise
  }

}
