import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ConsoleRoutingModule} from './console-routing.module';
import {CsmComponent} from './components/csm/csm.component';
import {JournalComponent} from './components/journal/journal.component';
import {MyModelsComponent} from './components/my-models/my-models.component';
import {StockComponent} from './components/stock/stock.component';
import {TradeComponent} from './components/trade/trade.component';
import {MyPortfoliosComponent} from './components/my-portfolios/my-portfolios.component';
import {SharedModule} from '../shared/shared.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {ConsoleComponent} from './console/console.component';
import {DialogEditModelPropretyComponent} from '../model/components/model-overview/dialog-edit-model-proprety/dialog-edit-model-proprety.component';
import {DashboardPerformanceComponent} from './components/dashboard-performance/dashboard-performance.component';
import {WidgetTopTradingModelsComponent} from './components/widget-top-trading-models/widget-top-trading-models.component';
import {CoreModule} from "../core/core.module";
import {LarsMatNavListComponent} from './components/lars-mat-nav-list/lars-mat-nav-list.component';
import {MyWatchlistsComponent} from './components/my-watchlists/my-watchlists.component';
import {PortfolioModule} from "../portfolio/portfolio.module";
import { DialogEditModelComponent } from './components/dialog-edit-model/dialog-edit-model.component';
import { DriveComponent } from './components/drive/drive.component';
import { DialogAddFolderComponent } from './components/dialog-add-folder/dialog-add-folder.component';
import { DialogRenameComponent } from './components/dialog-rename/dialog-rename.component';
import { WorldForexHoursComponent } from './components/world-forex-hours/world-forex-hours.component';
import { BrokerLoginComponent } from './components/broker-login/broker-login.component';


@NgModule({
  declarations: [
    DashboardComponent,
    JournalComponent,
    TradeComponent,
    StockComponent,
    CsmComponent,
    MyModelsComponent,
    MyPortfoliosComponent,
    ConsoleComponent,
    DialogEditModelPropretyComponent,
    DashboardPerformanceComponent,
    WidgetTopTradingModelsComponent,
    LarsMatNavListComponent,
    MyWatchlistsComponent,
    DialogEditModelComponent,
    DriveComponent,
    DialogAddFolderComponent,
    DialogRenameComponent,
    WorldForexHoursComponent,
    BrokerLoginComponent,
  ],
  imports: [
    CommonModule,
    ConsoleRoutingModule,
    PortfolioModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireAnalyticsModule,
  ],
  providers: []
})
export class ConsoleModule {
}
