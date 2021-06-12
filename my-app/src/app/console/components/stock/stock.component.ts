import { Component, OnInit } from '@angular/core';
declare const TradingView: any;

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.sass']
})
export class StockComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    new TradingView.widget(
      {
        "width": 980,
        "height": 610,
        "symbol": "NASDAQ:AAPL",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "light",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": false,
        "container_id": "tradingview_d4af4"
      }
    );
  }
}
