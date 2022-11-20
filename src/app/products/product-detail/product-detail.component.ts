import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../../core/service/data.service";
import { Product } from "../../model/product";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CustomizeComponent } from "../../customize/customize.component";
import { ProductService } from 'src/app/core/service/product.service';
import { ProductUtil } from 'src/app/util/ProductsUtil';
import { RatingService } from 'src/app/core/service/rating.service';
import { Rating } from 'src/app/model/rating';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  prod: Product[] = []
  ratings: Rating[] = []
  prodId: string = ""
  category: string = ""
  price: string = ""
  size: number = 0
  weight: string = ""
  mainImage: string = ""
  selectedImageIndex = 0;
  ratingForm!: FormGroup;

  productsUtil: ProductUtil = new ProductUtil();

  constructor(private route: ActivatedRoute,
    private dataService: DataService,
    private productService: ProductService,
    private ratingService: RatingService,
    private modal: NgbModal,
    private router: Router,
    private fb: FormBuilder) { }

  //for rating
  stars: number[] = [1, 2, 3, 4, 5];
  // selectedValue!: number;
  // countStar(star:any) {
  //   this.selectedValue = star;
  //   console.log('Value of star', star);
  // }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params.category)
      console.log(params.id)
      this.category = params.category
      this.prodId = params.id
      this.mainImage = "assets/images/products/" + this.prodId + "/i1.jpg"
    })



    this.productService.getProductData(this.prodId).subscribe(products => {
      console.log(products)
      this.prod = products
      this.productService.prodImageCount = products[0].noi
      this.productService.prodTextCount = products[0].not
      this.price = this.prod[0].price.split('~')[0]
    })

    //for ratings
    this.ratingService.getRating(this.prodId).then((res) => { this.ratings = res; console.log(this.ratings) }).catch(err => { console.log('error getting rating:' + err) })
    this.ratingForm = this.fb.group({
      rating: [4]
    });
  }

  sizeSelect(i: number) {
    this.size = i;
    // @ts-ignore
    this.price = this.prod[0].price.split('~')[i]
    // @ts-ignore
    this.weight = this.prod[0].weight.split('~')[i]
  }

  imageSelect(img: string, i: number) {
    console.log("click:" + img)
    this.selectedImageIndex = i
    this.mainImage = "assets/images/products/" + this.prodId + "/" + img + ".jpg"
  }

  customize() {
    console.log("going to customize")
    // const modRef=this.modal.open(CustomizeComponent)
    // @ts-ignore
    // modRef.componentInstance.noi = this.prod[0].noi
    // @ts-ignore
    // modRef.componentInstance.not = this.prod[0].not
    localStorage.setItem('pid', this.prodId)
    this.router.navigate(['customize'], { queryParams: { id: this.prodId, size: this.size } })

  }

}
