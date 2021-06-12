import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InvestingComponent} from './investing/investing.component';
import {PurchaseComponent} from './purchase/purchase.component';
import {TradingComponent} from './trading/trading.component';
import {PlatformOverviewComponent} from "./platform-overview/platform-overview.component";


const routes: Routes = [
  {path: 'investing', component: InvestingComponent},
  {path: 'trading', component: TradingComponent},
  {path: 'purchase', component: PurchaseComponent},
  {path: 'platform/overview', component: PlatformOverviewComponent},
  {path: 'platform', redirectTo: 'platform/overview'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
