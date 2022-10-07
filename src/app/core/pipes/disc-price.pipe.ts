import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discPrice'
})
export class DiscPricePipe implements PipeTransform {

  transform(val:string, disc:number): number {
    let itemPrice = Number(val)
    let discount = itemPrice*Number(disc)/100
    return (itemPrice-discount)
  }

}
