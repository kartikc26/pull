import { Cart } from "../model/cart"
import { Product } from "../model/product"


export class ProductUtil {

  getName(id: string, products: Product[]) {
    return products.filter(i => { return i.product_id == id })[0].product_name
  }

  getDescription(id: string, products: Product[]) {
    return products.filter(i => { return i.product_id == id })[0].description
  }

  getSize(id: string, size: string, products: Product[]) {
    return products.filter(i => { return i.product_id == id })[0].size.split("~")[parseInt(<string>size)]
  }

  getWeight(id: string, size: string, products: Product[]) {
    return products.filter(i => { return i.product_id == id })[0].weight.split("~")[parseInt(<string>size)]
  }

  getPrice(id: string, size: string, products: Product[]) {
    return products.filter(i => { return i.product_id == id })[0].price.split("~")[parseInt(<string>size)]
  }

  getPriceFromCart(id: string, cart: Cart[], products: Product[]) {
    return products.filter(i => { return i.product_id == id })[0].price.split("~")[parseInt(<string>cart.filter(i => { return i.product_id == id })[0].product_size)]
  }

  getDiscount(id: string, products: Product[]) {
    return products.filter(i => { return i.product_id == id })[0].discount
  }

  getDiscPrice(id: string, size: string, products: Product[]) {
    let price = parseInt(<string>this.getPrice(id, size, products))
    let disc = this.getDiscount(id, products)
    return price - price * disc / 100
  }

}