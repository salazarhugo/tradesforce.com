import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PortfolioDiversificationComponent} from "./components/portfolio-diversification/portfolio-diversification.component";
import {PortfolioOverviewComponent} from "./components/portfolio-overview/portfolio-overview.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'overview'},
  {path: 'overview', component: PortfolioOverviewComponent},
  {path: 'diversification', component: PortfolioDiversificationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule {
}
