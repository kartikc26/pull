import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../core/service/data.service";
import {Product} from "../model/product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  prod:Product[] |undefined
  prodType:any |undefined
  constructor(private route: ActivatedRoute,
              private dataService: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe( data => {
      console.log("data from route:"+data.productType)
      this.prodType=data.productType
      }
    )
    this.dataService.getProducts(this.prodType).subscribe(products=>{
      console.log(products)
      this.prod=products


    })
  }

  imgClick(prod_id:String){
    this.router.navigate(['product'],{queryParams: {category:this.prodType , id:prod_id}})
  }

  // ngOnDestroy() {
  //   this.prodType.unsubscribe();
  // }

}
