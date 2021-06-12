import {Component, OnDestroy, OnInit} from '@angular/core';
import {HighchartData} from "../../../core/models/highchart-data.model";
import {PortfolioService} from "../../services/portfolio.service";
import {FirestoreService} from "../../../services/firestore.service";
import {Stock} from "../../../core/models/stock.model";
import {Observable, of, Subscription} from "rxjs";

@Component({
  selector: 'app-portfolio-diversification',
  templateUrl: './portfolio-diversification.component.html',
  styleUrls: ['./portfolio-diversification.component.sass']
})
export class PortfolioDiversificationComponent implements OnInit, OnDestroy {

  user: Observable<any>
  stockAllocation: Observable<HighchartData[]>
  regionAllocation = new Observable<HighchartData[]>()
  tagsAllocation = new Observable<HighchartData[]>()
  stockExchangeAllocation = new Observable<HighchartData[]>()
  subs: Subscription[] = []

  constructor(
    public firestoreService: FirestoreService,
    private portfolioService: PortfolioService
  ) {
  }

  ngOnDestroy(): void {
    console.log("DESTROYED", this.subs)
    this.subs.forEach(sub => sub.unsubscribe())
  }

  ngOnInit(): void {
    this.user = this.firestoreService.docUser$()
    let s = this.portfolioService.stocks$.subscribe(stocks => {
      this.stockAllocation = of(this.populateIndividualAsset(stocks))
      this.regionAllocation = of(this.populateRegion(stocks))
      this.tagsAllocation = of(this.populateTags(stocks))
      this.stockExchangeAllocation = of(this.populateStockExchange(stocks))
    })
    this.subs.push(s)
  }

  populateStockExchange(stocks: Stock[]): HighchartData[] {
    let data: HighchartData[] = []
    stocks.forEach((stock: Stock) => {
      let a = data.find(hd => hd.name == stock.primaryExchange)
      if (a) {
        a.y += stock.marketValue
      } else if (stock.primaryExchange) {
        data.push(new HighchartData(stock.primaryExchange, stock.marketValue))
      }
    })
    return data
  }

  populateIndividualAsset(stocks: Stock[]): HighchartData[] {
    return stocks.map(stock =>
      new HighchartData(stock.symbol, Number(stock.marketValue))
    )
  }

  populateRegion(stocks: Stock[]): HighchartData[] {
    let data: HighchartData[] = []
    stocks.forEach((stock: Stock) => {
      let a = data.find(hd => hd.name == stock.region)
      if (a) {
        a.y += stock.marketValue
      } else if (stock.region) {
        data.push(new HighchartData(stock.region, stock.marketValue))
      }
    })
    return data
  }

  populateTags(stocks: Stock[]): HighchartData[] {
    let data: HighchartData[] = []
    stocks.forEach((stock: Stock) => {
      stock.tags.forEach(tag => {
        let a = data.find(hd => hd.name == tag)
        if (a) a.y += stock.marketValue
        else data.push(new HighchartData(tag, stock.marketValue))
      })
    })
    return data
  }

}
