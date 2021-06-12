import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuoteComponent} from "./quote/quote.component";
import {QuoteResolver} from "./guards/quote.resolver";
import {QuoteService} from "./services/quote.service";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    QuoteComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    QuoteResolver,
    QuoteService
  ]
})
export class QuoteModule {
}
