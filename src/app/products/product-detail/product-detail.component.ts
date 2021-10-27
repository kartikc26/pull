import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../../core/service/data.service";
import {Product} from "../../model/product";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  prod:Product[] |undefined
  prodId:string =""
  category:string =""

  constructor(private route:ActivatedRoute,
              private dataService: DataService) {  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      console.log(params.category)
      console.log(params.id)
      this.category=params.category
      this.prodId=params.id
      })

    this.dataService.getProductData(this.prodId).subscribe(products=>{
      console.log(products)
      this.prod=products
      // this.images= products[0].images.split('~')
      // this.sizes = products[0].size.split('~')

    })
  }

  sizeSelect(i:number){

  }

}
