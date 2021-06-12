import {Component, Input, OnInit} from '@angular/core';
import {Stock} from "../../../core/models/stock.model";
import {IexApiService} from "../../../core/http/iexcloud/iex-api.service";
import {Observable} from "rxjs/internal/Observable";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {Portfolio} from "../../../core/models/portfolio.model";
import * as Highcharts from 'highcharts';

export class Stats {
  totalMarketValue: number = 0
  dayGain: number = 0
  dayChange: number = 0
  totalGain: number = 0
  totalChange: number = 0
}

@Component({
  selector: 'portfolio-header',
  templateUrl: './portfolio-header.component.html',
  styleUrls: ['./portfolio-header.component.sass']
})
export class PortfolioHeaderComponent implements OnInit {

  @Input() stocks: Observable<Stock[]>
  @Input() portfolio: Portfolio
  stats = new Observable<Stats>()

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options
  chart: Highcharts.Chart

  constructor(
    private iexService: IexApiService
  ) {
  }

  ngOnChanges(): void {
    this.computeHeaderStats()
  }

  ngOnInit(): void {
    this.computeHeaderStats()
    // this.iexService.chart("SPY", "1y").subscribe((data: HistoricalPrice[]) => {
    //   let a = []
    //   data.forEach(price => {
    //     a.push({name: price.date, y: price.close})
    //   })
    //   this.updateChart(a)
    // })
  }

  updateChart(data: any) {
    this.chartOptions = {
      chart: {
        height: '100px',
        backgroundColor: null,
        styledMode: false,
        spacingLeft: 0,
        marginBottom: 30,
        alignTicks: false
      },
      title: {
        text: null
      },
      subtitle: {
        text: null
      },
      legend: {
        enabled: false
      },
      xAxis: {
        visible: false,
        type: "datetime",
        crosshair: {
          label: {
            enabled: true,
            formatter: function (t) {
              return '<span class="privacy-svg-target privacy-target">' + "</span>"
            },
            backgroundColor: "rgba(77, 110, 157, 1)"
          }
        }
      },
      yAxis: {
        visible: false,
        crosshair: {
          label: {
            enabled: true,
            formatter: function (t) {
              return '<span class="numeric privacy-svg-target privacy-target">' + t + "</span>"
            },
            backgroundColor: "rgba(77, 110, 157, 1)"
          }
        },
      },
      plotOptions: {
        spline: {
          dataLabels: {
            enabled: false
          },
          marker: {
            enabled: false
          },
          states: {
            hover: {
              enabled: true
            }
          },
          borderWidth: 0,
          pointPlacement: "on",
        }
      },
      series: [{
        name: 'NAV',
        type: "spline",
        color: "#4d6e9d",
        data: data
      }],
      credits: {
        enabled: false
      },
    }
  }

  computeHeaderStats(): void {
    this.stats = this.stocks.pipe(switchMap((stocks: Stock[]) => {
      let stats = new Stats()
      stocks.forEach(stock => {
        this.countTotalMarketValue(stats, stock.marketValue)
        this.countDayGain(stats, stock.quantity, stock.change)
        this.countTotalGain(stats, stock.averagePrice, stock.latestPrice, stock.quantity)
      })
      stats.dayChange = stats.dayGain / (stats.totalMarketValue - stats.dayGain)
      return of(stats)
    }))
  }

  countTotalGain(stats: Stats, averagePrice: number, latestPrice: number, quantity: number) {
    if (averagePrice > 0)
      stats.totalGain += (latestPrice - averagePrice) * quantity
  }

  countDayGain(stats: Stats, quantity: number, change: number) {
    stats.dayGain += quantity * change
  }

  countTotalMarketValue(stats: Stats, marketValue: number) {
    stats.totalMarketValue += marketValue
  }
}
