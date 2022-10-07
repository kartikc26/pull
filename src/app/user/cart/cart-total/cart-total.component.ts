import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/service/cart.service';
import { ProductService } from 'src/app/core/service/product.service';
import { Cart } from 'src/app/model/cart';
import { Product } from 'src/app/model/product';
import { ProductUtil } from 'src/app/util/ProductsUtil';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrls: ['./cart-total.component.css']
})
export class CartTotalComponent implements OnInit {

  cart: Cart[] = []
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
    let ids = ''
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


  checkout(){
    this.router.navigate(['checkout'])
  }

}
