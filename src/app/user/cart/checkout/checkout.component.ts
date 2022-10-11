import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/service/cart.service';
import { ProductService } from 'src/app/core/service/product.service';
import { Cart } from 'src/app/model/cart';
import { Product } from 'src/app/model/product';
import { CartComponent } from '../cart.component';
import { ProductUtil } from 'src/app/util/ProductsUtil';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/core/service/address.service';
import { Address } from 'src/app/model/address';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  addressForm!: FormGroup;
  cart: Cart[] = []
  products: Product[] = []
  addresses: Address[] = []
  currentAddress!: Address
  subtotal: number = 0
  shipping: number = 0
  newUserDiscount: number = 0
  couponDiscount: number = 0
  total: number = 0
  productsUtil: ProductUtil = new ProductUtil()

  addAddress: boolean = false

  states:string[]=['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal']


  

  constructor(private cartService: CartService,
    private fb: FormBuilder,
    private addressService: AddressService,
    private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {

    this.products = this.cartService.products
    if (this.products.length == 0) {
      // this.router.navigate(['cart'])
    }
    console.log(this.products)
    this.cart = this.cartService.cart
    this.shipping = this.cartService.shipping
    this.couponDiscount = this.cartService.couponDiscount
    this.newUserDiscount = this.cartService.newUserDiscount
    this.subtotal = this.cartService.getCartSubtotal()
    this.total = this.cartService.getCartTotal()

    this.addressService.fetchAddress().then((res:any) =>{
      console.log(res)
      if(res=='false'){
        console.log('no existing address')
      }
      this.addresses = res
      this.currentAddress = this.addresses.filter(i =>{return i.is_default == '1'})[0]
    })
    // this.fetchAddresses()
    
  }

  fetchAddresses(){
    this.addressService.fetchAddress().then((res:any) =>{
      console.log(res)
      if(res=='false'){
        console.log('no existing address')
      }
      this.addresses = res
    })
  }

  createForm() {
    this.addressForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      alternatePhone: [''],
      line1: [''],
      line2: [''],
      city: ['', Validators.required],
      state: [''],
      pincode: ['', Validators.required],
      type: [''],
      setDefault: ['']
    });
  }

  addNewAddress() {
    this.addAddress = true
  }

  setCurrentAddress(timesta:string){
    this.currentAddress = this.addresses.filter(i => {return i.timesta == timesta})[0]
  }

  saveAddress() {
    this.addressForm.value.timesta = Date.now()
    this.addressForm.value.email = localStorage.getItem('uid')
    //add form validations
    console.log(this.addressForm.value)
    this.addressService.addAddress(this.addressForm.value).then(res =>{
      if(res == 'false'){
        window.alert('Couldnt add, please retry')
      }else{
        window.alert('address added')
        this.addressForm.reset
        this.addAddress = false

        //call fetch address api
        this.fetchAddresses()

      }
    }).catch(err =>{console.log(err)})


  }

  deleteAddress(timesta:string){

    this.addressService.deleteAddress(timesta).then(res =>{
      if(res == false){
        window.alert('couldnt delete address')
      }else{
        window.alert('address deleted')
        window.location.reload()
      }
    }).catch(err =>{console.log(err)})

  }


}
