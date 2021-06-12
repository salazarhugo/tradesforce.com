import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Quote} from "../../core/models/quote.model";
import {Observable} from "rxjs/internal/Observable";
import {IexApiService} from "../../core/http/iexcloud/iex-api.service";
import {DynamicScriptLoaderService} from "../../services/dynamic-script-loader-service.service";
import {Subscription} from "rxjs";

declare const TradingView: any;

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.sass']
})
export class QuoteComponent implements OnInit, OnDestroy {

  quote: Quote
  sseQuote: Observable<Quote>

  constructor(
    private route: ActivatedRoute,
    private iexService: IexApiService,
    private scriptService: DynamicScriptLoaderService
  ) {
  }

  sseSubscription: Subscription

  ngOnInit(): void {
    this.route.data.subscribe((data: { quote: Quote }) => {
      console.log(data)
      this.quote = data.quote
    })
    let a = new Set<string>()
    a.add(this.quote.symbol)
    // this.sseQuote = this.iexService.sseQuotes(a).pipe(map(event => JSON.parse(event.data)[0]))
    // this.sseSubscription = this.sseQuote.subscribe(data => console.log(data))
  }

  ngOnDestroy(): void {
    if (this.sseSubscription)
      this.sseSubscription.unsubscribe()
  }

  ngAfterViewInit() {
    // new TradingView.widget(
    //   {
    //     "width": 980,
    //     "height": 610,
    //     "symbol": "NASDAQ:AAPL",
    //     "interval": "D",
    //     "timezone": "Etc/UTC",
    //     "theme": "light",
    //     "style": "1",
    //     "locale": "en",
    //     "toolbar_bg": "#f1f3f6",
    //     "enable_publishing": false,
    //     "allow_symbol_change": true,
    //     "container_id": "tradingview_e321e"
    //   }
    // );
  }

}
