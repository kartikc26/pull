import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/core/service/cart.service';
import { DataService } from 'src/app/core/service/data.service';
import { ProductService } from 'src/app/core/service/product.service';
import { Cart } from 'src/app/model/cart';
import { Product } from 'src/app/model/product';
import { ProductUtil } from 'src/app/util/ProductsUtil';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  couponForm!: FormGroup
  isLogIn: boolean = false
  cart: Cart[] = []
  products: Product[] = []
  subtotal: number = 0
  shipping: number = 0
  newUserDiscount: number = 0
  couponDiscount: number = 0
  total: number = 0
  productsUtil:ProductUtil = new ProductUtil();

  constructor(private modal: NgbModal,
    private cartService: CartService,
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router) { 
      this.createForm();
    }

  ngOnInit() {

    let ids = ''
    console.log(localStorage.getItem("isUserLoggedIn"))
    // @ts-ignore
    if (localStorage.getItem('isUserLoggedIn') && localStorage.getItem('isUserLoggedIn').toString() == "true") {
      this.isLogIn = true;
    }

    this.cartService.fetchCart().toPromise().then((res: any) => {
      if (res != 'No Data') {
        this.cart = res
        this.cartService.cart=this.cart
      }
      console.log(this.cart)
      this.cart.forEach(item => {
        ids = ids + "'" + item.product_id + "',"
      })
      ids = ids.slice(0, -1)
      console.log(ids)

      this.productService.getMultipleProductData(ids).toPromise()
        .then((res: Product[]) => {
          this.products = res
          this.cartService.products = this.products
          console.log(this.products)
          this.subtotal=this.cartService.getCartSubtotal()
          this.total=this.cartService.getCartTotal()
        }).catch(err => console.log('error:' + err))
    })

  }

  createForm() {
    this.couponForm = this.fb.group({
      coupon: ['', Validators.required]
    });
  }

  addCoupon(){
    
  }

  removeFromCart(timesta:string, path:string){
    console.log('delete: '+timesta)
    this.cartService.deleteFromCart(timesta,path).then(res=>{
      console.log('deleted: '+timesta)
      window.location.reload()
    }
      ).catch(err=>console.log('error deleting'))
  }

}
