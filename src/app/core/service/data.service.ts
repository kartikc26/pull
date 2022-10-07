import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable, ReplaySubject } from "rxjs";
import { Product } from "../../model/product";
import { Rating } from "../../model/rating";
import { User } from '../../model/user';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  constructor(private http: HttpClient,
    private router: Router) { }

  register(data: any) {
    console.log(JSON.stringify(data))
    return this.http.post(environment.serviceUrl + 'registeruser.php', JSON.stringify(data)).pipe(
      map((res: any) => {
        this.login(data)
        return res;
      })
    )
  }

  login(data: any) {
    console.log(data)
    let promise = new Promise((resolve, reject) => {
      this.http.post(environment.serviceUrl + 'login.php', JSON.stringify(data)).toPromise().then((res: any) => {
        // this.res = data;
        if (res) {
          let b = CryptoJS.AES.decrypt(res, environment.cryptKey.toString()).toString(CryptoJS.enc.Utf8);
          console.log(res);
          console.log(b);
          if (b == data.pwd) {
            localStorage.setItem('isUserLoggedIn', 'true');
            localStorage.setItem('uid', data.email)
            console.log(localStorage.getItem('isUserLoggedIn'));
            resolve(true)
          } else {
            console.log('invalid pwd')
            reject(false)
          }
        } else if(res=='not_exist') {
          console.error("cannot login, not registered")
          localStorage.setItem('isUserLoggedIn', 'false');
          window.alert('Kindly register befor login')
          reject(false)
        } else {
          console.error("cannot login")
          localStorage.setItem('isUserLoggedIn', 'false');
          reject(false)
        }
      })
    })
    return promise
}

  logout() {
    localStorage.setItem("isUserLoggedIn", "false")
  }

  validateUser(data: any) {
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

  

  getRating(product_id: string): Observable<Rating> {
    return this.http.get<Rating>(environment.serviceUrl + 'getrating.php?product_id=' + product_id)
  }

  

  upload(file: File, idx: number, path: string) {

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
    let cart: string
    return this.fetchWishlist().then((res: any) => {
      if (res != null && res.toString().length > 2) {
        console.log(res)
        cart = data.pid + "~" + res.cart.toString()
        data.cart = cart
      }
      this.updateWishlist(data).then(res => console.log(res)).catch(err => console.log(err))
    });
  }

  fetchWishlist() {
    let promise = new Promise((resolve, reject) => {
    this.http.post(environment.serviceUrl + 'fetchwishlist.php', JSON.stringify({ 'email': localStorage.getItem('uid') }))
      .toPromise()
        .then(res => { resolve(res) })
        .catch(msg => [reject(msg)])
    });
    return promise
  }

  updateWishlist(data: any) {
    console.log(data)
    let promise = new Promise((resolve, reject) => {
      this.http.post(environment.serviceUrl + 'updatewishlist.php', JSON.stringify(data)).toPromise()
        .then(res => { resolve(res) })
        .catch(msg => [reject(msg)])
    });
    return promise
  }

  deleteFromWishlist(pid: String) {
    let wishlist: string
    return this.fetchWishlist().then((res: any) => {
      console.log(res)
      if (res != null && res.toString().length > 2) {
        console.log(res)
        wishlist = res.wishlist.toString().replace(pid + '~', '')
        console.log(wishlist)
        this.updateWishlist({ 'email': localStorage.getItem('uid'), 'wishlist': wishlist }).then(res => console.log(res)).catch(err => console.log(err))
      } else {
        console.log('already empty')
      }
    })

  }

  getUserData(uid: any) {
    let promise = new Promise<User[]>((resolve, reject) => {
      this.http.post<User[]>(environment.serviceUrl + 'getaccountdata.php', JSON.stringify(uid)).toPromise()
        .then((res: User[]) => { resolve(res) })
        .catch(msg => [reject(msg)])
    });
    return promise

  }

}
