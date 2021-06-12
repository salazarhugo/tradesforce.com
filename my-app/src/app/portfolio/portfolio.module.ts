import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "../core/core.module";
import {HttpClientModule} from "@angular/common/http";
import {PortfolioComponent} from "./components/portfolio/portfolio.component";
import {PortfolioHeaderComponent} from "./components/portfolio-header/portfolio-header.component";
import {DialogEditPortfolioComponent} from "./components/dialog-edit-portfolio/dialog-edit-portfolio.component";
import {PortfolioTableComponent} from "./components/portfolio-table/portfolio-table.component";
import {RouterModule} from "@angular/router";
import {PortfolioDiversificationComponent} from './components/portfolio-diversification/portfolio-diversification.component';
import {PortfolioRoutingModule} from "./portfolio-routing.module";
import {PortfolioOverviewComponent} from './components/portfolio-overview/portfolio-overview.component';


@NgModule({
  declarations: [
    PortfolioComponent,
    PortfolioHeaderComponent,
    DialogEditPortfolioComponent,
    PortfolioTableComponent,
    PortfolioDiversificationComponent,
    PortfolioOverviewComponent
  ],
  imports: [
    PortfolioRoutingModule,
    CommonModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: []
})
export class PortfolioModule {
}
