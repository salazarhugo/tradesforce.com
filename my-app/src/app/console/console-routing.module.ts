import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ModelResolver} from '../model/guards/model.resolver';
import {CsmComponent} from './components/csm/csm.component';
import {JournalComponent} from './components/journal/journal.component';
import {ModelOverviewComponent} from '../model/components/model-overview/model-overview.component';
import {ModelRulesComponent} from '../model/components/model-rules/model-rules.component';
import {ModelTrackerComponent} from '../model/components/model-tracker/model-tracker.component';
import {MyModelsComponent} from './components/my-models/my-models.component';
import {MyPortfoliosComponent} from './components/my-portfolios/my-portfolios.component';
import {PortfolioComponent} from '../portfolio/components/portfolio/portfolio.component';
import {StockComponent} from './components/stock/stock.component';
import {TradeComponent} from './components/trade/trade.component';
import {PortfolioResolver} from '../portfolio/guards/portfolio.resolver';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ProfileComponent} from "../core/components/profile/profile.component";
import {QuoteComponent} from "../quote/quote/quote.component";
import {QuoteResolver} from "../quote/guards/quote.resolver";
import {WatchlistResolver} from "../watchlist/guards/watchlist.resolver";
import {WatchlistComponent} from "../watchlist/watchlist/watchlist.component";
import {MyWatchlistsComponent} from "./components/my-watchlists/my-watchlists.component";
import {ModelComponent} from "../model/model/model.component";
import {DriveComponent} from "./components/drive/drive.component";
import {TradeResolver} from "./guards/trade.resolver";
import {WorldForexHoursComponent} from "./components/world-forex-hours/world-forex-hours.component";


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'portfolios', component: MyPortfoliosComponent},
  {path: 'watchlists', component: MyWatchlistsComponent},
  {path: 'models', component: MyModelsComponent},
  {path: 'drive', component: DriveComponent},
  {
    path: 't/:id',
    component: TradeComponent,
    resolve: {trade: TradeResolver},
  },
  {path: 'journal', component: JournalComponent},
  {path: 'stock', component: StockComponent},
  {path: 'csm', component: CsmComponent},
  {path: 'wfth', component: WorldForexHoursComponent},
  {path: 'profile', component: ProfileComponent},
  {
    path: 'q/:symbol',
    component: QuoteComponent,
    resolve: {quote: QuoteResolver},
    loadChildren: () => import('../quote/quote.module').then(m => m.QuoteModule)
  },
  {
    path: 'p/:id',
    component: PortfolioComponent,
    resolve: {portfolio: PortfolioResolver},
    loadChildren: () => import('../portfolio/portfolio.module').then(m => m.PortfolioModule)
  },
  {
    path: 'm/:id',
    component: ModelComponent,
    resolve: {model: ModelResolver},
    loadChildren: () => import('../model/model.module').then(m => m.ModelModule)
  },
  {
    path: 'w/:id',
    component: WatchlistComponent,
    resolve: {model: WatchlistResolver},
    loadChildren: () => import('../watchlist/watchlist.module').then(m => m.WatchlistModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleRoutingModule {
}
