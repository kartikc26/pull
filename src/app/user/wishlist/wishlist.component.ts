import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/core/service/data.service';
import { ProductService } from 'src/app/core/service/product.service';
import { Product } from 'src/app/model/product';
import { CommonUtil } from 'src/app/util/CommonUtil';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlist:string=''
  commonUtils = new CommonUtil();
  products:Product[]=[]
  constructor(private modal: NgbModal,
    private dataService: DataService,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {

    this.dataService.fetchWishlist().then((res:any)=>{
      console.log(res)
      this.productService.getMultipleProductData(this.commonUtils.getSqlInString(res.wishlist.toString().split("~"))).toPromise()
      .then((data:Product[])=>{
        console.log(data)
        this.products=data
      }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))


  }

  imgClick(prod_id:String){
    this.router.navigate(['product'],{queryParams: {id:prod_id}})
  }

  deleteWishlist(id:string){
    this.dataService.deleteFromWishlist(id).then(res=>{
      console.log('deleted')
      const index = this.products.indexOf(this.products.filter(i => {return i.product_id == id})[0], 0);
      console.log(index)
      if (index > -1) {
        this.products.splice(index, 1);
        console.log(this.products)
      }
    }).catch(err=>console.log(err))
  }

}
