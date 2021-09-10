import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

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
}
