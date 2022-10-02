import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../core/service/data.service";
import {Product} from "../../model/product";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomizeComponent} from "../../customize/customize.component";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  prod:Product[] |undefined
  prodId:string =""
  category:string =""
  price:string ="Select Size"
  size:number = 0
  weight:string =""
  mainImage:string=""

  constructor(private route:ActivatedRoute,
              private dataService: DataService,
              private modal: NgbModal,
              private router: Router) {  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      console.log(params.category)
      console.log(params.id)
      this.category=params.category
      this.prodId=params.id
      this.mainImage="assets/images/products/"+this.prodId+"/i1.jpg"
      })



    this.dataService.getProductData(this.prodId).subscribe(products=>{
      console.log(products)
      this.prod=products
      this.dataService.prodImageCount=products[0].noi
      this.dataService.prodTextCount=products[0].not
    })
  }

  sizeSelect(i:number){
    this.size=i;
    // @ts-ignore
    this.price=this.prod[0].price.split('~')[i]
    // @ts-ignore
    this.weight=this.prod[0].weight.split('~')[i]
  }

  imageSelect(i:string){
    console.log("click:"+i)
    this.mainImage="assets/images/products/"+this.prodId+"/"+i+".jpg"
  }

  customize(){
    console.log("going to customize")
    // const modRef=this.modal.open(CustomizeComponent)
    // @ts-ignore
    // modRef.componentInstance.noi = this.prod[0].noi
    // @ts-ignore
    // modRef.componentInstance.not = this.prod[0].not
    localStorage.setItem('pid',this.prodId)
    this.router.navigate(['customize'],{queryParams: {id:this.prodId, size:this.size}})

  }

}
