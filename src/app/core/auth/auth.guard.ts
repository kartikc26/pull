import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){

  }

  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      if(localStorage.getItem('isUserLoggedIn')){
        return resolve(true);
      } 
      console.log('not logg in')
      reject(false)
      this.router.navigate([''])

    })
  }
  
}
