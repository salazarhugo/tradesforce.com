import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WatchlistComponent} from './watchlist/watchlist.component';
import {WatchlistService} from "./services/watchlist.service";
import {WatchlistResolver} from "./guards/watchlist.resolver";
import {SharedModule} from "../shared/shared.module";
import {CoreModule} from "../core/core.module";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    WatchlistComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
    WatchlistService,
    WatchlistResolver
  ]
})
export class WatchlistModule {
}
