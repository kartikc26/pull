import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/service/cart.service';
import { ProductService } from 'src/app/core/service/product.service';
import { Product } from 'src/app/model/product';
import { CartComponent } from '../cart.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  products: Product[] = []
  subtotal: number = 0
  shipping: number = 0
  newUserDiscount: number = 0
  couponDiscount: number = 0
  total: number = 0

  constructor(private cartService: CartService,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {

    this.products = this.cartService.products
    if(this.products.length == 0){
      this.router.navigate(['cart'])
    }
    console.log(this.products)
    this.shipping=this.cartService.shipping
    this.couponDiscount=this.cartService.couponDiscount
    this.newUserDiscount=this.cartService.newUserDiscount
    this.subtotal = this.cartService.getCartSubtotal()
    this.total = this.cartService.getCartTotal()
  }

}
