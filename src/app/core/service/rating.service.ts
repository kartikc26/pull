import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Rating } from 'src/app/model/rating';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient,
    private router: Router) { }


    getRating(product_id: string) {
      let promise = new Promise<Rating[]>((resolve, reject) => {
        this.http.get<Rating[]>(environment.serviceUrl + 'getrating.php?product_id=' + product_id)
          .toPromise()
            .then(res => { resolve(res) })
            .catch(msg => [reject(msg)])
        });
        return promise
    }
}
