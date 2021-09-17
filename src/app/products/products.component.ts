import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  prod = ["product 1","product 2","product 3","product 4","product 5","product 6","product 7"]

  constructor() { }

  ngOnInit(): void {
  }

}
