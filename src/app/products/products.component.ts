import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../core/service/data.service";
import { ProductService } from '../core/service/product.service';
import {Product} from "../model/product";
import { ProductUtil } from '../util/ProductsUtil';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  prod:Product[] =[]
  prodType:any |undefined
  productsUtil:ProductUtil = new ProductUtil();
  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe( data => {
      console.log("data from route:"+data.productType)
      this.prodType=data.productType
      }
    )
    this.productService.getProducts(this.prodType).subscribe(products=>{
      console.log(products)
      this.prod=products


    })
  }

  navigateToCustomize(prod_id:String){
    this.router.navigate(['product'],{queryParams: {category:this.prodType , id:prod_id}})
  }

  // ngOnDestroy() {
  //   this.prodType.unsubscribe();
  // }

}
