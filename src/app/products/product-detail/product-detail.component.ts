import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private route:ActivatedRoute) {  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      console.log(params.category)
      console.log(params.id)
    })
  }

}
