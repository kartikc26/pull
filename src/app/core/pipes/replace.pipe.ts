import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(val:String, replaceFrom:string, replaceTo:string): String {

    return val.split(replaceFrom).join(replaceTo)

  }

}
