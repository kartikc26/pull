import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { LoginComponent } from './login/login.component';
import { WishlistComponent } from './user/wishlist/wishlist.component';
import { CartComponent } from './user/cart/cart.component';
import { AccountComponent } from './user/account/account.component';
import { OrdersComponent } from './user/orders/orders.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { ErrorComponent } from './error/error.component';
import { PipesModule} from "./core/pipes/pipes.module";
import { CustomizeComponent } from './customize/customize.component';
import { CheckoutComponent } from './user/cart/checkout/checkout.component';
import { CartTotalComponent } from './user/cart/cart-total/cart-total.component';
import { OrderDetailsComponent } from './user/order-details/order-details.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailComponent,
    LoginComponent,
    WishlistComponent,
    CartComponent,
    AccountComponent,
    OrdersComponent,
    HeaderComponent,
    FooterComponent,
    ContactComponent,
    RegisterComponent,
    ErrorComponent,
    CustomizeComponent,
    CheckoutComponent,
    CartTotalComponent,
    OrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    PipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
