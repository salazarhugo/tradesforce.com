import {LOCALE_ID, NgModule} from '@angular/core';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAnalyticsModule, UserTrackingService} from '@angular/fire/analytics';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DynamicScriptLoaderService} from './services/dynamic-script-loader-service.service';
import {IndexService} from './services/index.service';
import {SidenavService} from './services/sidenav.service';
import {SharedModule} from './shared/shared.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AuthModule} from "./auth/auth.module";
import {PortfolioModule} from "./portfolio/portfolio.module";
import {QuoteModule} from "./quote/quote.module";
import {ModelModule} from "./model/model.module";
import {WatchlistModule} from "./watchlist/watchlist.module";
import {PortfolioResolver} from "./portfolio/guards/portfolio.resolver";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AuthModule,
        SharedModule,
        PortfolioModule,
        WatchlistModule,
        ModelModule,
        QuoteModule,
        FlexLayoutModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFireAnalyticsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ],
    providers: [
        UserTrackingService,
        {provide: LOCALE_ID, useValue: "en-UK"},
        DynamicScriptLoaderService,
        IndexService,
        SidenavService,
        PortfolioResolver,
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {autoFocus: false, restoreFocus: false, hasBackdrop: true}},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
