import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  addAddress(data:any){

    let promise = new Promise((resolve, reject) => {
      this.http.post(environment.serviceUrl + 'addaddress.php', JSON.stringify(data)).toPromise()
        .then(res => { resolve(res) })
        .catch(msg => [reject(msg)])
    });
    return promise

  }

  fetchAddress(){
    let promise = new Promise((resolve, reject) => {
      this.http.post(environment.serviceUrl + 'fetchaddress.php', JSON.stringify({email: localStorage.getItem('uid')})).toPromise()
        .then(res => { resolve(res) })
        .catch(msg => [reject(msg)])
    });
    return promise
  }

  deleteAddress(timesta:string){
    let promise = new Promise((resolve, reject) => {
      this.http.post(environment.serviceUrl + 'deleteaddress.php', JSON.stringify({email: localStorage.getItem('uid'), timesta: timesta})).toPromise()
        .then(res => { resolve(res) })
        .catch(msg => [reject(msg)])
    });
    return promise
  }
}
