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
import html2canvas from 'html2canvas';
import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";
import { ignoreElements } from 'rxjs/operators';
import { DataService } from 'src/app/core/service/data.service';
import { OrderDetail } from 'src/app/model/orderDetail';
import { OrderService } from 'src/app/core/service/order.service';
import { OrderItems } from 'src/app/model/orderItems';
import { User } from 'src/app/model/user';

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
  currentAddressString=''
  subtotal: number = 0
  shipping: number = 0
  newUserDiscount: number = 0
  couponDiscount: number = 0
  total: number = 0
  productsUtil: ProductUtil = new ProductUtil()

  addAddress: boolean = false
  uploadPath: string = 'invoices/' + localStorage.getItem('uid') + '/'

  states: string[] = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal']




  constructor(private cartService: CartService,
    private dataService: DataService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private addressService: AddressService,
    private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {

    this.products = this.cartService.products
    if (this.products.length == 0) {
      this.router.navigate(['cart'])
    }
    console.log(this.products)
    this.cart = this.cartService.cart
    this.shipping = this.cartService.shipping
    this.couponDiscount = this.cartService.couponDiscount
    this.newUserDiscount = this.cartService.newUserDiscount
    this.subtotal = this.cartService.getCartSubtotal()
    this.total = this.cartService.getCartTotal()
    this.fetchAddresses()

  }

  fetchAddresses() {
    this.addressService.fetchAddress().then((res: any) => {
      console.log(res)
      if (res == 'false') {
        console.log('no existing address')
      }
      this.addresses = res
      this.currentAddress = this.addresses.filter(i => { return i.is_default == '1' })[0]
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

  setCurrentAddress(timesta: string) {
    this.currentAddress = this.addresses.filter(i => { return i.timesta == timesta })[0]
  }

  saveAddress() {
    this.addressForm.value.timesta = Date.now()
    this.addressForm.value.email = localStorage.getItem('uid')
    //add form validations
    console.log(this.addressForm.value)
    this.addressService.addAddress(this.addressForm.value).then(res => {
      if (res == 'false') {
        window.alert('Couldnt add, please retry')
      } else {
        window.alert('address added')
        this.addressForm.reset
        this.addAddress = false

        //call fetch address api
        this.fetchAddresses()

      }
    }).catch(err => { console.log(err) })


  }

  deleteAddress(timesta: string) {

    this.addressService.deleteAddress(timesta).then(res => {
      if (res == false) {
        window.alert('couldnt delete address')
      } else {
        window.alert('address deleted')
        window.location.reload()
      }
    }).catch(err => { console.log(err) })

  }

  placeOrder() {

    let date = new Date()
    let timestaMilli = Date.now()
    console.log(timestaMilli)
    let dateIndia = date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
    console.log(dateIndia)

    let invoice_id = "IN" + this.currentAddress.pincode + timestaMilli
    let order_id = "OD" + timestaMilli
    this.currentAddressString = this.currentAddress.name + ', ' + this.currentAddress.line_1 + ', ' + this.currentAddress.line_2 + ', ' + this.currentAddress.city + ', ' + this.currentAddress.state + ', ' + this.currentAddress.pincode + ' -- ' + this.currentAddress.phone


    //set order detail
    let orderDetail: OrderDetail = {
      id: order_id,
      // @ts-ignore
      email: localStorage.getItem('uid'),
      address: this.currentAddressString,
      mop: 'SAVECONSTANT',
      amount: this.subtotal,
      discount: this.newUserDiscount + this.couponDiscount,
      final_amount: this.total,
      order_timesta: dateIndia,
      payment_id: 'lol123',
      payment_status: 'SUCCESS',
      coupon_id: 'NA',
      invoice_id: invoice_id,
      invoice: this.uploadPath + invoice_id + ".pdf",
      status: 'Success'
    }
    console.log(orderDetail)
    this.orderService.setOrderDetail(orderDetail).then(() => { console.log('order detail added Successfully'); }).catch(() => console.log('order detail error, please retry!'))

    //set order items
    let orderItems: OrderItems[] = []
    this.cart.forEach(cartItem => {
      let orderItem: OrderItems = {
        // @ts-ignore
        user_id: localStorage.getItem('uid'),
        weight: this.productsUtil.getWeight(cartItem.product_id,cartItem.product_size,this.products),
        size: this.productsUtil.getSize(cartItem.product_id,cartItem.product_size,this.products),
        order_id: order_id,
        product_id: cartItem.product_id,
        images: cartItem.images,
        text: cartItem.texts,
        amount: String(this.productsUtil.getDiscPrice(cartItem.product_id,cartItem.product_size,this.products))
      }
      orderItems.push(orderItem)
    })
    console.log(orderItems)
    this.orderService.setOrderItems(orderItems).then(() => { console.log('order items added Successfully'); }).catch(() => console.log('order items error, please retry!'))

    this.getInvoicePdf(date, invoice_id, orderItems);

    this.router.navigate(['order-details'], { queryParams: { 'success': 'true' , 'id': order_id} })
  }

  getInvoicePdf(date: Date, invoice_id: string, orderItems: OrderItems[]) {

    this.dataService.getUserData(localStorage.getItem('uid')).then((data: User[]) => {
      console.log('Got user data')
      let userData=data[0]

      var props = {
        outputType: OutputType.DataUriString,
        returnJsPDFDocObject: false,

        fileName: "Invoice 2021",
        orientationLandscape: false,
        compress: true,
        logo: {
          src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
          type: 'PNG', //optional, when src= data:uri (nodejs case)
          width: 53.33, //aspect ratio = width/height
          height: 26.66,
          margin: {
            top: 0, //negative or positive num, from the current position
            left: 0 //negative or positive num, from the current position
          }
        },
        stamp: {
          inAllPages: true, //by default = false, just in the last page
          src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
          type: 'JPG', //optional, when src= data:uri (nodejs case)
          width: 20, //aspect ratio = width/height
          height: 20,
          margin: {
            top: 0, //negative or positive num, from the current position
            left: 0 //negative or positive num, from the current position
          }
        },
        business: {
          name: "Gift & Wish",
          address: "Humara Pyara Ghar",
          phone: "9627583482",
          email: "kartikchhabra@gmail.com",
          email_1: "rishiparashar@gmail.com",
          website: "www.giftnwish.in",
        },
        contact: {
          label: "",
          name: this.currentAddress.name,
          address: this.currentAddress.line_1 +", "+this.currentAddress.line_2 + ", ",
          phone: this.currentAddress.city+", "+this.currentAddress.state+", "+this.currentAddress.pincode, //address line 
          email: this.currentAddress.phone, //phone 
          otherInfo: "", //this.currentAddress.email, //email
        },
        invoice: {
          label: "Invoice #: ",
          num: invoice_id,
          invDate: date.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
          invGenDate: "",
          headerBorder: false,
          tableBodyBorder: false,
          header: [
            {
              title: "#",
              style: {
                width: 10
              }
            },
            {
              title: "Title",
              style: {
                width: 30
              }
            },
            {
              title: "Description",
              style: {
                width: 80
              }
            },
            { title: "Price" },
            // { title: "Discount" },
            // { title: "Unit" },
            { title: "Total" }
          ],
          table: Array.from(orderItems, (item, index) => ([
            index + 1,
            this.productsUtil.getName(item.product_id,this.products),
            this.productsUtil.getDescription(item.product_id,this.products),
            String(item.amount),
            String(item.amount)
          ])),
          additionalRows: [{
            col1: 'SubTotal:',
            col2: String(this.subtotal),
            // col3: 'ALL',
            style: {
              fontSize: 10 //optional, default 12
            }
          },
          {
            col1: 'Discount:',
            col2: String(this.newUserDiscount + this.couponDiscount),
            // col3: '%',
            style: {
              fontSize: 10 //optional, default 12
            }
          },
          {
            col1: 'Total:',
            col2: String(this.total),
            // col3: 'ALL',
            style: {
              fontSize: 14 //optional, default 12
            }
          }],
          invDescLabel: "Invoice Note:",
          invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
        },
        footer: {
          text: "The invoice is created on a computer and is valid without the signature and stamp.",
        },
        pageEnable: true,
        pageLabel: "Page ",
      };

      // @ts-ignore
      const pdfObject = jsPDFInvoiceTemplate(props);

      const arr = pdfObject.dataUriString?.split(',');
      // @ts-ignore
      const mime = arr[0].match(/:(.*?);/)[1];
      // @ts-ignore
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], invoice_id + ".pdf", { type: 'pdf' })
      this.dataService.upload(file, 0, this.uploadPath).then(() => { console.log('Uploaded Successfully'); }).catch(() => console.log('Upload error, please retry!'))

      console.log(file)
    }).catch((err) => { console.log('Unable to get user data'+err) })
  }
}
