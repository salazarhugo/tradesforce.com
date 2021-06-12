import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs/internal/Observable";
import {Observer} from "rxjs";
import {LatestRate} from "../../models/latestRatesResponse.model";
import {HistoricalPrice} from "../../models/historical-price.model";
import {StockExchangeStatus} from "../../models/stock-exchange-status.model";

@Injectable({
  providedIn: 'root'
})
export class IexApiService {

  constructor(
    private http: HttpClient,
    private _zone: NgZone
  ) {
  }

  IEX_API_TOKEN = 'pk_dd45d7fc0c8a4ec0bf9dc9acc9eec900'
  IEX_API_SANDBOX_TOKEN = 'Tpk_e02ef4ff30a611e9958142010a80043c'
  BASE_URL = 'https://cloud.iexapis.com/stable'
  SSE_BASE_URL = 'https://cloud-sse.iexapis.com/stable'
  SANDBOX_BASE_URL = 'https://sandbox.iexapis.com/stable'
  SSE_SANDBOX_BASE_URL = 'https://sandbox-sse.iexapis.com/stable'

  convert(symbols: Set<string>): Observable<LatestRate[]> {
    let symbolsJoin = [...symbols].join(',')
    return this.http.get(`${this.BASE_URL}/fx/latest?symbols=${symbolsJoin}&token=${this.IEX_API_TOKEN}`) as Observable<LatestRate[]>
  }

  chart(symbol: string, range: string): Observable<HistoricalPrice[]> {
    //TODO("Type range") type Range = 'max' | '5y' | '2y' | '1y' | 'ytd'
    return this.http.get(`${this.BASE_URL}/stock/${symbol}/chart/${range}?chartCloseOnly=true&token=${this.IEX_API_TOKEN}`) as Observable<HistoricalPrice[]>
  }

  usMarketStatus(): Observable<StockExchangeStatus> {
    const fields = [
      'primaryExchange',
      'isUSMarketOpen',
      'iexMarketPercent',
      'openTime',
      'closeTime',
      'iexCloseTime'
    ].join(',')
    return this.http.get(`${this.BASE_URL}/stock/GOOGL/quote?filter=${fields}&token=${this.IEX_API_TOKEN}`) as Observable<StockExchangeStatus>
  }

  quote(symbol): Observable<Object> {
    return this.http.get(`${this.BASE_URL}/stock/${symbol}/quote?token=${this.IEX_API_TOKEN}`)
  }

  batchQuotes(symbols: Set<string>): Observable<any> {
    let symbolsJoin = [...symbols].join(',')
    return this.http.get(`${this.BASE_URL}/stock/market/batch?symbols=${symbolsJoin}&types=quote&token=${this.IEX_API_TOKEN}`)
  }

  sseQuotes(symbols: Set<string>): Observable<any> {
    let symbolsJoin = [...symbols].join(',')
    console.log(symbols)
    return this.getServerSentEvent(`${this.SSE_BASE_URL}/stocksUS5Second?symbols=${symbolsJoin}&token=${this.IEX_API_TOKEN}`)
  }

  search(query: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/search/${query}?token=${this.IEX_API_TOKEN}`)
  }

  getServerSentEvent(url: string): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      const eventSource = this.getEventSource(url);
      eventSource.onmessage = event => {
        this._zone.run(() => {
          observer.next(event);
        });
      };
      eventSource.onerror = error => {
        this._zone.run(() => {
          observer.error(error);
        });
      };
    });
  }

  private getEventSource(url: string): EventSource {
    // var eventSourceInitDict = {headers: {'Access-Control-Allow-Origin': '*'}};
    return new window.EventSource(url)//eventSourceInitDict)
  }

  getRsi(symbol) {
    return new Promise((resolve, reject) => {
      this.http.get(`https://fcsapi.com/api-v2/forex/indicators?symbol=${symbol}&period=15m&access_key=DprWnIJ6wlAICq9GzudgBL2EiklnnmvnCOqN4Qb9KoR3YEjL2d`).toPromise().then(res => {
        console.log(Number(res['response']['indicators']['RSI14']))
        if (res['status'] === true)
          resolve(Number(res['response']['indicators']['RSI14']))
      })
    })
  }
}
