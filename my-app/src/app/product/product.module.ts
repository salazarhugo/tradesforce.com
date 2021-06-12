import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {TradingComponent} from './trading/trading.component';
import {InvestingComponent} from './investing/investing.component';
import {PurchaseComponent} from './purchase/purchase.component';
import {SharedModule} from '../shared/shared.module';
import {ProductMastheadComponent} from './product-masthead/product-masthead.component';
import {ProductComponent} from './product.component';
import {PlatformOverviewComponent} from './platform-overview/platform-overview.component';


@NgModule({
  declarations: [
    TradingComponent,
    InvestingComponent,
    PurchaseComponent,
    ProductMastheadComponent,
    ProductComponent,
    PlatformOverviewComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
  ]
})
export class ProductModule {
}
