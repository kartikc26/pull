import { NgModule } from '@angular/core';
import {DiscPricePipe} from "./disc-price.pipe";
import {ReplacePipe} from "./replace.pipe";

@NgModule({
  declarations: [
    DiscPricePipe,
    ReplacePipe
  ],
  imports: [

  ],
  exports: [
    DiscPricePipe,
    ReplacePipe
  ]
  ,
})
export class PipesModule {}
