import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/core/service/data.service';
import { ProductService } from 'src/app/core/service/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderStatus=''
  orderId=''
  mainMessage=''

  constructor(private route:ActivatedRoute,
    private dataService: DataService,
    private productService: ProductService,
    private modal: NgbModal,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      console.log(params.success+", "+params.id)
      this.orderStatus = params.success
      this.orderId = params.id

      if(this.orderStatus=='true'){
        this.mainMessage='Congratulations! Your order is complete.'
      } else if (this.orderStatus=='false'){
        this.mainMessage="Sorry! Your order couldn't be processed."
      }
      })
  }

}
