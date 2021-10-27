import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discPrice'
})
export class DiscPricePipe implements PipeTransform {

  transform(val:String, disc:number): number {
    let itemPrice = Number(val.split("~")[0])
    let discount = itemPrice*disc/100
    return (itemPrice-discount)

  }

}
