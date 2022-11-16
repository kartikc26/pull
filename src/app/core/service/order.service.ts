import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  setOrderDetail(data:any){
    console.log(data)
    let promise = new Promise((resolve, reject) => {
      this.http.post(environment.serviceUrl + 'addorderdata.php', JSON.stringify(data)).toPromise()
        .then(res => { resolve(res) })
        .catch(msg => [reject(msg)])
    });
    return promise
  }

  setOrderItems(data:any){
    console.log(data)
    let promise = new Promise((resolve, reject) => {
      this.http.post(environment.serviceUrl + 'addorderitems.php', JSON.stringify(data)).toPromise()
        .then(res => { resolve(res) })
        .catch(msg => [reject(msg)])
    });
    return promise
  }

}
