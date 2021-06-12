import {Injectable} from '@angular/core';
import {BehaviorSubject, of} from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';
import {Portfolio} from '../../core/models/portfolio.model';
import {Stock} from '../../core/models/stock.model';
import {FirestoreService} from '../../services/firestore.service';
import {AngularFireFunctions} from "@angular/fire/functions";
import {map, switchMap} from "rxjs/operators";
import {LatestRate} from "../../core/models/latestRatesResponse.model";
import {IexApiService} from "../../core/http/iexcloud/iex-api.service";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  rates: Observable<LatestRate[]>
  currencies = new Set<string>()
  symbols = new Set<string>()
  regions = new Map<string, number>()
  portfoliosCol = this.fs.getUserDocument().collection('portfolios').ref

  private _portfolio = new BehaviorSubject<Portfolio>(new Portfolio())
  portfolio$ = this._portfolio.asObservable()

  private _stocks = new BehaviorSubject<Stock[]>([])
  stocks$ = this._stocks.asObservable()

  constructor(
    public fs: FirestoreService,
    private fns: AngularFireFunctions,
    private iexApiService: IexApiService,
  ) {
  }

  fetchStocks(portfolioId: string): void {
    this.fs.listenStocks(portfolioId).pipe(
      switchMap((stocks: Stock[]) => {
        this.count(stocks)
        return this.fetchQuotes(portfolioId, stocks)
      })
    ).subscribe(this._stocks)
  }

  updateStocks(stocks: Stock[]) {
    this._stocks.next(stocks);
  }

  fetchQuotes(portfolioId: string, stocks: Stock[]): Observable<Stock[]> {
    if (this.symbols.size == 0) {
      return of(stocks)
    }
    return this.iexApiService.batchQuotes(this.symbols).pipe(switchMap(quotes => {
      stocks.forEach((stock: Stock) => {
        let symbol = stock.symbol
        if (!quotes[symbol])
          return
        let quote = quotes[symbol].quote
        stock.changePercent = quote.changePercent
        stock.change = quote.change
        stock.latestSource = quote.latestSource
        stock.latestTime = quote.latestTime
        stock.primaryExchange = quote.primaryExchange
        // if (!stock.latestPrice)
        stock.latestPrice = quote.latestPrice
        if (!stock.companyName)
          stock.companyName = quote.companyName
      })
      return this.fetchMarketValue(portfolioId, stocks)
    }))
  }

  fetchMarketValue(portfolioId: string, stocks: Stock[]): Observable<Stock[]> {
    return this.listenPortfolio(portfolioId).pipe(switchMap((portfolio: Portfolio) => {
      const baseCurrency = portfolio.currency.iso_code.toString()
      const currencies = new Set<string>()
      for (let currency of this.currencies) {
        if (currency != baseCurrency)
          currencies.add(currency + baseCurrency)
      }

      if (currencies.size == 0) {
        stocks.forEach(stock => stock.marketValue = stock.latestPrice * stock.quantity)
        return of(stocks)
      }

      return this.iexApiService.convert(currencies).pipe(map(rates => {
        stocks.forEach(stock => stock.marketValue = this.predicate(baseCurrency, rates, stock.currency) * stock.latestPrice * stock.quantity)
        // this.updateStocks(stocks)
        return stocks
      }))
    }))
  }

  predicate(baseCurrency: string, arr: LatestRate[], currency: string): number {
    if (!currency)
      return 1
    let a = arr.find(res => res.symbol == currency + baseCurrency)
    if (!a)
      return 1
    return a.rate
  }

  count(stocks) {
    stocks.forEach(stock => {
      this.countSymbols(stock)
      this.countCurrencies(stock)
    })
  }

  countSymbols(stock) {
    if (stock.symbol)
      this.symbols.add(stock.symbol)
  }

  countCurrencies(stock) {
    if (stock.currency)
      this.currencies.add(stock.currency)
  }

  setPortfolio(portfolio: Portfolio): void {
    this._portfolio.next(portfolio);
  }

  listenPortfolio(portfolioId: string): Observable<any> {
    return this.fs.docWithId$(`${this.portfoliosCol.path}/${portfolioId}`)
  }

  listenPortfolios(): Observable<any> {
    return this.fs.colWithIds$(this.portfoliosCol.path)
  }

  addPortfolio(portfolio: Portfolio): Promise<any> {
    return this.fs.addWithId$(this.portfoliosCol.path, portfolio)
  }

  editPortfolio(portfolio: Portfolio): Promise<any> {
    return this.fs.update$(this.portfoliosCol.doc(portfolio.id).path, portfolio)
  }

  updatePortfolio(portfolioId: string, obj: Object): Promise<any> {
    return this.fs.update$(this.portfoliosCol.doc(portfolioId).path, obj)
  }

  /**
   * Call the 'recursiveDelete' callable function with portfolio path to initiate
   * a server-side delete.
   */
  deletePortfolio(portfolioId): Promise<any> {
    const path: string = this.portfoliosCol.doc(portfolioId).path
    console.log(path)
    const deleteFn = this.fns.httpsCallable('recursiveDelete')
    return deleteFn({path: path}).toPromise()
  }

  addStock(portfolioId: string, stock: Stock) {
    let portfolioStocksCol = this.portfoliosCol.doc(portfolioId).collection('stocks')
    return this.fs.addWithId$(portfolioStocksCol.path, stock)
  }

  updateStock(stock: Stock) {
    let portfolioStocksCol = this.portfoliosCol.doc(stock.portfolioId).collection('stocks').doc(stock.id)
    return this.fs.update$(portfolioStocksCol.path, stock)
  }

  deleteStock(stock: Stock) {
    let portfolioStocksCol = this.portfoliosCol.doc(stock.portfolioId).collection('stocks').doc(stock.id)
    return this.fs.delete$(portfolioStocksCol.path)
  }
}
