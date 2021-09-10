import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { AuthGuard } from './core/auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { AccountComponent } from './user/account/account.component';
import { CartComponent } from './user/cart/cart.component';
import { OrdersComponent } from './user/orders/orders.component';
import { WishlistComponent } from './user/wishlist/wishlist.component';

const routes: Routes = [
  {path: "", component:HomeComponent, pathMatch:"full"},
  {path: "account", component:AccountComponent, canActivate:[AuthGuard]},
  {path: "orders", component:OrdersComponent, canActivate:[AuthGuard]},
  {path: "wishlist", component:WishlistComponent, canActivate:[AuthGuard]},
  {path: "cart", component:CartComponent},
  {path: "contact", component:ContactComponent},
  {path: "product-detail", component:ProductDetailComponent},
  {path: "boy", component:ProductsComponent, data: {productType: 'boy'}},
  {path: "girl", component:ProductsComponent, data: {productType: 'girl'}},
  {path: "brother", component:ProductsComponent, data: {productType: 'brother'}},
  {path: "sister", component:ProductsComponent, data: {productType: 'sister'}},
  {path: "mother", component:ProductsComponent, data: {productType: 'mother'}},
  {path: "father", component:ProductsComponent, data: {productType: 'father'}},
  {path: "kids", component:ProductsComponent, data: {productType: 'kids'}},
  {path: "birthday", component:ProductsComponent, data: {productType: 'birthday'}},
  {path: "anniversary", component:ProductsComponent, data: {productType: 'anniversary'}},
  {path: "wedding", component:ProductsComponent, data: {productType: 'wedding'}},
  {path: "miscellaneous", component:ProductsComponent, data: {productType: 'miscellaneous'}}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
