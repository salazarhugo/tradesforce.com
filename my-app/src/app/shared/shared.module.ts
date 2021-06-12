import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedRoutingModule} from './shared-routing.module';
import {BlueButtonComponent} from './components/buttons/blue-button/blue-button.component';
import {ForexTableComponent} from './components/tables/forex-table/forex-table.component';
import {StrokedCardComponent} from './components/cards/stroked-card/stroked-card.component';
import {RaisedCardComponent} from './components/cards/raised-card/raised-card.component';
import {AppMaterialModule} from './app-material.module';
import {AddTradeComponent} from './components/add-trade/add-trade.component';
import {DialogAddModelComponent} from './components/dialog-add-model/dialog-add-model.component';
import {DialogAddModelPropretyComponent} from './components/dialog-add-model-proprety/dialog-add-model-proprety.component';
import {DialogAddStockComponent} from './components/dialog-add-stock/dialog-add-stock.component';
import {DialogDeleteModelComponent} from './components/dialog-delete-model/dialog-delete-model.component';
import {DialogDeletePortfolioComponent} from './components/dialog-delete-portfolio/dialog-delete-portfolio.component';
import {DialogEditStockComponent} from './components/dialog-edit-stock/dialog-edit-stock.component';
import {ManageTagsComponent} from './components/manage-tags/manage-tags.component';
import {AddTagComponent} from './components/add-tag/add-tag.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAnalyticsModule} from '@angular/fire/analytics';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {environment} from 'src/environments/environment';
import {PrettySpanComponent} from './components/pretty-span/pretty-span.component';
import {HomePortfolioComponent} from './components/home-portfolio/home-portfolio.component';
import {HomeTradingComponent} from './components/home-trading/home-trading.component';
import {ProfileComponent} from './components/profile/profile.component';
import {FooterComponent} from './components/footer/footer.component';
import {OrderComponent} from './components/order/order.component';
import {TableForexComponent} from './components/table-forex/table-forex.component';
import {TableStockTradeComponent} from './components/table-stock-trade/table-stock-trade.component';
import {EditTradeComponent} from './components/edit-trade/edit-trade.component';
import {ManagePortfoliosComponent} from './components/manage-portfolios/manage-portfolios.component';
import {TvChartComponent} from './components/tv-chart/tv-chart.component';
import {AddPortfolioComponent} from './components/add-portfolio/add-portfolio.component';
import {ColumnsCheckboxComponent} from './components/colomns-checkbox/columns-checkbox.component';
import {SectorDistributionComponent} from './components/sector-distribution/sector-distribution.component';
import {DialogCountryPickerComponent} from './components/dialog-country-picker/dialog-country-picker.component';
import {CountryFlagComponent} from './components/country-flag/country-flag.component';
import {CardWidgetComponent} from './components/card-widget/card-widget.component';
import {HighchartsChartModule} from "highcharts-angular";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {NewPortfolioButtonComponent} from './components/buttons/new-portfolio-button/new-portfolio-button.component';
import {CurrencySelectorComponent} from './components/currency-selector/currency-selector.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { IbnumberDirective } from './directives/ibnumber.directive';

@NgModule({
  declarations: [
    BlueButtonComponent,
    ForexTableComponent,
    StrokedCardComponent,
    RaisedCardComponent,
    AddTradeComponent,
    DialogAddModelComponent,
    DialogAddModelPropretyComponent,
    DialogAddStockComponent,
    DialogDeleteModelComponent,
    DialogDeletePortfolioComponent,
    DialogEditStockComponent,
    ManageTagsComponent,
    AddTagComponent,
    PrettySpanComponent,
    HomePortfolioComponent,
    HomeTradingComponent,
    ProfileComponent,
    FooterComponent,
    OrderComponent,
    TableForexComponent,
    TableStockTradeComponent,
    EditTradeComponent,
    ManageTagsComponent,
    ManagePortfoliosComponent,
    TvChartComponent,
    AddPortfolioComponent,
    ColumnsCheckboxComponent,
    SectorDistributionComponent,
    DialogCountryPickerComponent,
    CountryFlagComponent,
    CardWidgetComponent,
    NewPortfolioButtonComponent,
    CurrencySelectorComponent,
    CarouselComponent,
    IbnumberDirective,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAnalyticsModule,
    HighchartsChartModule,
    FlexModule,
  ],
  exports: [
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    BlueButtonComponent,
    ForexTableComponent,
    StrokedCardComponent,
    RaisedCardComponent,
    AddTradeComponent,
    DialogAddModelComponent,
    DialogAddModelPropretyComponent,
    DialogAddStockComponent,
    DialogCountryPickerComponent,
    DialogDeleteModelComponent,
    DialogDeletePortfolioComponent,
    DialogEditStockComponent,
    ManageTagsComponent,
    AddTagComponent,
    PrettySpanComponent,
    HomePortfolioComponent,
    HomeTradingComponent,
    ProfileComponent,
    FooterComponent,
    OrderComponent,
    TableForexComponent,
    TableStockTradeComponent,
    EditTradeComponent,
    ManageTagsComponent,
    ManagePortfoliosComponent,
    TvChartComponent,
    AddPortfolioComponent,
    ColumnsCheckboxComponent,
    SectorDistributionComponent,
    CardWidgetComponent,
    CountryFlagComponent,
    NewPortfolioButtonComponent,
    CarouselComponent,
    IbnumberDirective,
  ],
})
export class SharedModule {
}
