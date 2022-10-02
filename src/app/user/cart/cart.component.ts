import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/core/service/data.service';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  isLogIn:boolean = false
  cart:string[]=[]
  products:Product[]=[]

  constructor(private modal: NgbModal,
    private dataService: DataService) { }

  ngOnInit(): void {

    console.log(localStorage.getItem("isUserLoggedIn"))
    // @ts-ignore
    if(localStorage.getItem('isUserLoggedIn') && localStorage.getItem('isUserLoggedIn').toString() == "true"){
      this.isLogIn=true;
    }

    this.dataService.fetchCart().subscribe((res:any) =>{
      console.log(res)
      this.cart = res.cart.toString().split(['~']).slice(0,-1)
      console.log(this.cart)
      this.cart.forEach(item =>{
        this.dataService.getProductData(item).toPromise()
        .then((res:Product[])=>{
          this.products.push(res[0])
          console.log(this.products)
          return
        })
      })

    })

  }

}
