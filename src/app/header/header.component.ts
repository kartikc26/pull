import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import {DataService} from "../core/service/data.service";
import {Product} from "../model/product";
import { Cart } from '../model/cart';
import { User } from '../model/user';
import { ProductUtil } from '../util/ProductsUtil';
import { CartService } from '../core/service/cart.service';
import { ProductService } from '../core/service/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogIn=false;
  loginClicked:boolean=false;
  cart:Cart[]=[]
  products:Product[]=[]
  userData!:User
  navShow:boolean=false
  handleShow:boolean=false
  clickedGiftFor:boolean=false
  clickedCategory:boolean=false
  clickedOccassion:boolean=false
  productsUtil:ProductUtil = new ProductUtil();
  constructor(private modal: NgbModal,
              private dataService: DataService,
              private cartService: CartService,
              private productService: ProductService) { }

  ngOnInit(): void {
    console.log(localStorage.getItem("isUserLoggedIn"))
    console.log(localStorage.getItem("uid"))
    // @ts-ignore
    if(localStorage.getItem('isUserLoggedIn') && localStorage.getItem('isUserLoggedIn').toString() == "true"){
      this.isLogIn=true;
      this.dataService.getUserData(localStorage.getItem('uid')).then((res:User[])=>{
        this.userData=res[0]
        console.log(this.userData)
      }).catch(err=>console.log(err))
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

    this.cartService.fetchCart().subscribe((res:any) =>{
      console.log(res)
      if(res!='No Data'){
        this.cart = res
      }
      console.log(this.cart)
      this.cart.forEach(item =>{
        this.productService.getProductData(item.product_id).toPromise()
        .then((res:Product[])=>{
          this.products.push(res[0])
          console.log(this.products)
          return
        })
      })

    })

    


  }

  login() {
    this.loginClicked = true
    const modalRef = this.modal.open(LoginComponent);
    // modalRef.componentInstance.name = 'World';
  }

  logout() {
    this.dataService.logout()
    this.isLogIn=false;
    localStorage.setItem('uid','')
    window.location.reload()
  }

  removeFromCart(timesta:string, path:string){
    console.log('delete: '+timesta)
    this.cartService.deleteFromCart(timesta,path).then(res=>console.log('deleted: '+timesta)).catch(err=>console.log('error deleting'))
  }

  toggleClass(){
    this.navShow = !this.navShow
    this.handleShow = !this.handleShow

  }

  openGiftFor(){
    this.clickedGiftFor = !this.clickedGiftFor
  }

  openOccassion(){
    this.clickedOccassion = !this.clickedOccassion
  }

  openCategory(){
    this.clickedCategory = !this.clickedCategory
  }
}
