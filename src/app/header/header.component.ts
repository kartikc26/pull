import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import {DataService} from "../core/service/data.service";
import {Product} from "../model/product";
import { Cart } from '../model/cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogIn=false;
  cart:Cart[]=[]
  products:Product[]=[]
  constructor(private modal: NgbModal,
              private dataService: DataService) { }

  ngOnInit(): void {
    console.log(localStorage.getItem("isUserLoggedIn"))
    // @ts-ignore
    if(localStorage.getItem('isUserLoggedIn') && localStorage.getItem('isUserLoggedIn').toString() == "true"){
      this.isLogIn=true;
    }

    // this.dataService.fetchCart()
    // .then((res:any)=>{
    //   console.log(res)
    //   this.cart = res.cart.toString().split(['~']).slice(0,-1)
    //   console.log(this.cart)

    //   this.cart.forEach(item =>{
    //     this.dataService.getProductData(item).toPromise()
    //     .then((res:Product[])=>{
    //       this.products.push(res[0])
    //       console.log(this.products)
    //       return
    //     })
    //   })

    // }).catch(err=>{console.log(err)})

    this.dataService.fetchCart().subscribe((res:any) =>{
      console.log(res)
      this.cart = res
      // console.log(this.cart)
      this.cart.forEach(item =>{
        this.dataService.getProductData(item.product_id).toPromise()
        .then((res:Product[])=>{
          this.products.push(res[0])
          console.log(this.products)
          return
        })
      })

    })

    


  }

  login() {
    const modalRef = this.modal.open(LoginComponent);
    // modalRef.componentInstance.name = 'World';
  }

  logout() {
    this.dataService.logout()
    this.isLogIn=false;
    localStorage.setItem('uid','')
    window.location.reload()
  }

  removeFromCart(pid:String){
    console.log(pid)
    this.dataService.deleteFromCart(pid)
  }
}
