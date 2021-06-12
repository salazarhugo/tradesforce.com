import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
  LanguageCode,
  ResolutionString,
  widget,
} from 'src/assets/charting_library';
import {Trade} from "../../../core/models/trade";
import {Datafeed} from "./Datafeed";


@Component({
  selector: 'app-tv-chart',
  templateUrl: './tv-chart.component.html',
  styleUrls: ['./tv-chart.component.sass']
})
export class TvChartComponent implements OnInit, OnDestroy {

  private _symbol: ChartingLibraryWidgetOptions['symbol'] = 'AAPL';
  private _interval: ChartingLibraryWidgetOptions['interval'] = 'D' as ResolutionString;
  // BEWARE: no trailing slash is expected in feed URL
  private _datafeedUrl = 'https://demo_feed.tradingview.com';
  private _libraryPath: ChartingLibraryWidgetOptions['library_path'] = '/assets/charting_library/';
  private _chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'] = 'https://saveload.tradingview.com';
  private _chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'] = '1.1';
  private _clientId: ChartingLibraryWidgetOptions['client_id'] = 'tradingview.com';
  private _userId: ChartingLibraryWidgetOptions['user_id'] = 'public_user_id';
  private _fullscreen: ChartingLibraryWidgetOptions['fullscreen'] = false;
  private _autosize: ChartingLibraryWidgetOptions['autosize'] = true;
  private _containerId: ChartingLibraryWidgetOptions['container_id'] = 'tv_chart_container';
  private _tvWidget: IChartingLibraryWidget | null = null;

  @Input() trade: Trade;

  @Input()
  set symbol(symbol: ChartingLibraryWidgetOptions['symbol']) {
    this._symbol = symbol || this._symbol;
  }

  @Input()
  set interval(interval: ChartingLibraryWidgetOptions['interval']) {
    this._interval = interval || this._interval;
  }

  @Input()
  set datafeedUrl(datafeedUrl: string) {
    this._datafeedUrl = datafeedUrl || this._datafeedUrl;
  }

  @Input()
  set libraryPath(libraryPath: ChartingLibraryWidgetOptions['library_path']) {
    this._libraryPath = libraryPath || this._libraryPath;
  }

  @Input()
  set chartsStorageUrl(chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url']) {
    this._chartsStorageUrl = chartsStorageUrl || this._chartsStorageUrl;
  }

  @Input()
  set chartsStorageApiVersion(chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version']) {
    this._chartsStorageApiVersion = chartsStorageApiVersion || this._chartsStorageApiVersion;
  }

  @Input()
  set clientId(clientId: ChartingLibraryWidgetOptions['client_id']) {
    this._clientId = clientId || this._clientId;
  }

  @Input()
  set userId(userId: ChartingLibraryWidgetOptions['user_id']) {
    this._userId = userId || this._userId;
  }

  @Input()
  set fullscreen(fullscreen: ChartingLibraryWidgetOptions['fullscreen']) {
    this._fullscreen = fullscreen || this._fullscreen;
  }

  @Input()
  set autosize(autosize: ChartingLibraryWidgetOptions['autosize']) {
    this._autosize = autosize || this._autosize;
  }

  @Input()
  set containerId(containerId: ChartingLibraryWidgetOptions['container_id']) {
    this._containerId = containerId || this._containerId;
  }

  ngOnInit() {
    function getLanguageFromURL(): LanguageCode | null {
      const regex = new RegExp('[\\?&]lang=([^&#]*)');
      const results = regex.exec(location.search);

      return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode;
    }

    // @ts-ignore
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: this._symbol,
      // datafeed: Datafeed, //new (window as any).Datafeeds.UDFCompatibleDatafeed(this._datafeedUrl),
      interval: this._interval,
      container_id: this._containerId,
      library_path: this._libraryPath,
      locale: getLanguageFromURL() || 'en',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      charts_storage_url: this._chartsStorageUrl,
      charts_storage_api_version: this._chartsStorageApiVersion,
      client_id: this._clientId,
      user_id: this._userId,
      fullscreen: this._fullscreen,
      autosize: this._autosize,
    };

    const tvWidget = new widget(widgetOptions);
    this._tvWidget = tvWidget;

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        this.addCheckApiButton(tvWidget)
      })
      this.addHorizontalLines(tvWidget)
      this.addMovingAverages(tvWidget)
    })
  }

  addHorizontalLines(tvWidget) {
    tvWidget.activeChart().createShape({time: 1, price: this.trade.takeprofit}, {
      shape: 'horizontal_line',
      text: 'tp',
      overrides: {linecolor: "#00b300", linewidth: 2, showLabel: true}
    })

    tvWidget.activeChart().createShape({time: 1, price: this.trade.entryprice}, {
      shape: 'horizontal_line',
      text: 'entry',
      overrides: {linecolor: "#000", linewidth: 2, showLabel: true}
    })

    tvWidget.activeChart().createShape({time: 1514764800, price: this.trade.stoploss}, {
      shape: 'horizontal_line',
      text: 'sl',
      overrides: {linecolor: "#e60000", linewidth: 2, showLabel: true}
    })
  }

  addMovingAverages(tvWidget) {
    tvWidget.activeChart().createStudy('Moving Average Exponential', false, false, [6], {
      "Plot.color": "#ff0000",
      "Plot.transparency": 0
    })

    tvWidget.activeChart().createStudy('Moving Average Exponential', false, false, [18], {
      "Plot.color": "#00008b",
      "Plot.transparency": 0
    })

    tvWidget.activeChart().createStudy('Moving Average Exponential', false, false, [50], {
      "Plot.color": "#00008b",
      "Plot.transparency": 0,
      "Plot.linewidth": 2
    })

    tvWidget.activeChart().createStudy('Moving Average Exponential', false, false, [200], {
      "Plot.color": "#ff0000",
      "Plot.transparency": 0,
      "Plot.linewidth": 2
    })
  }

  addCheckApiButton(tvWidget) {
    const button = tvWidget.createButton()
    button.setAttribute('title', 'Click to show a notification popup')
    button.classList.add('apply-common-tooltip')
    button.addEventListener('click', () => tvWidget.showNoticeDialog({
      title: 'Notification',
      body: 'TradingView Charting Library API works correctly',
      callback: () => {
        console.log('Noticed!')
      },
    }))
    button.innerHTML = 'Check API'
  }

  private candles = {
    "mainSeriesProperties.candleStyle.upColor": "#ffffff",
    "mainSeriesProperties.candleStyle.downColor": "#ff0000",
    "mainSeriesProperties.candleStyle.borderUpColor": "#000000",
    "mainSeriesProperties.candleStyle.borderDownColor": "#ff0000",
    "mainSeriesProperties.candleStyle.wickUpColor": "#000000",
    "mainSeriesProperties.candleStyle.wickDownColor": "#ff0000",
  }

  ngOnDestroy() {
    if (this._tvWidget !== null) {
      this._tvWidget.remove();
      this._tvWidget = null;
    }
  }
}
