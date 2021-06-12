import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute, Router} from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatDialog} from '@angular/material/dialog'
import {Model} from 'src/app/core/models/model.model';
import {Trade} from 'src/app/core/models/trade';
import {FirestoreService} from 'src/app/services/firestore.service';
import {AddTradeComponent} from 'src/app/shared/components/add-trade/add-trade.component';
import {ModelService} from '../../services/model.service';
import * as Highcharts from 'highcharts/highcharts';
import HighchartsMore from 'highcharts/highcharts-more.src';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import {Observable} from "rxjs/internal/Observable";
import {HighchartData} from "../../../core/models/highchart-data.model";
import {ModelStats} from "../../../core/models/modelStats.model";
import {map, switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {Filter} from "../filter-builder/filter-builder.component";
import {NotificationService} from "../../../services/notification/notification.service";
import firebase from "firebase/app";
import firestore = firebase.firestore;

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);


@Component({
  selector: 'app-model-overview',
  templateUrl: './model-overview.component.html',
  styleUrls: ['./model-overview.component.sass']
})
export class ModelOverviewComponent implements OnInit {

  model: Model
  profit: Array<number>
  filters$: Observable<Filter[]>
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options
  winrateChartOptions: Highcharts.Options
  bChartOptions: Highcharts.Options
  directionChartOptions: Highcharts.Options
  modelPropreties: Array<any>
  modelTags = new Set()
  streak: Array<any> = [0, "WIN"]
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  opened: boolean;
  trades$: Observable<Trade[]>
  modelStats$: Observable<ModelStats>
  modelStatistics: Model

  constructor(
    public firestore: AngularFirestore,
    public firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    public modelService: ModelService,
    public notification: NotificationService,
  ) {
  }

  updateDirectionChart(longCount, shortCount) {
    const data = [new HighchartData('Long trades', longCount, '#e4e4e4'),
      new HighchartData('Short trades', shortCount, '#000')]

    this.bChartOptions = {
      chart: {
        height: 200,
        type: 'pie',
        backgroundColor: null,
      },
      title: {
        verticalAlign: 'middle',
        text: "<span class='mat-h2'>" + (longCount / shortCount).toFixed(2) + "</span>",
        useHTML: true,
        style: {color: ''}
      },
      subtitle: {
        text: null
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          center: ['50%', '50%']
        }
      },
      series: [{
        name: '',
        type: "pie",
        data: data,
        colorByPoint: true,
        innerSize: '70%',
        dataLabels: {
          enabled: false,
        },
      }],
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      }
    }
  }

  updateBChart(winAvg, lossAvg) {
    const data = [new HighchartData('Average win', winAvg, '#e4e4e4'),
      new HighchartData('Average loss', lossAvg * -1, '#000')]

    this.bChartOptions = {
      chart: {
        height: 200,
        type: 'pie',
        backgroundColor: null,
      },
      title: {
        verticalAlign: 'middle',
        text: "<span class='mat-h2'>" + (winAvg / lossAvg * -1).toFixed(2) + "</span>",
        useHTML: true,
        style: {color: ''}
      },
      subtitle: {
        text: null
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          center: ['50%', '50%']
        }
      },
      series: [{
        name: '',
        type: "pie",
        data: data,
        colorByPoint: true,
        innerSize: '70%',
        dataLabels: {
          enabled: false,
        },
      }],
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      }
    }
  }

  updateWinrateChart(winCount, lossCount) {
    const winRate = winCount / (winCount + lossCount) * 100
    const data = [new HighchartData('Wining trades', winCount, '#34a853'),
      new HighchartData('Losing trades', lossCount, '#ea4335')]
    this.winrateChartOptions = {
      chart: {
        height: 200,
        type: 'pie',
        backgroundColor: null,
      },
      title: {
        verticalAlign: 'middle',
        text: "<span class='mat-h2'>" + winRate.toFixed(2) + "% </span>",
        useHTML: true,
        style: {color: ''}
      },
      subtitle: {
        text: null
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          center: ['50%', '50%']
        }
      },
      series: [{
        name: '',
        type: "pie",
        data: data,
        colorByPoint: true,
        innerSize: '70%',
        dataLabels: {
          enabled: false,
        },
      }],
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      }
    }
  }

  updateChart(data) {
    this.chartOptions = {
      chart: {
        type: 'areaspline',
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
        type: "linear",
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
      yAxis: [{
        opposite: true,
        title: {
          text: null
        },
        labels: {
          formatter: function (t) {
            return '<span class="numeric privacy-svg-target privacy-target">' + t.value + '</span>'
          }
        },
        crosshair: {
          label: {
            enabled: true,
            formatter: function (t) {
              return '<span class="numeric privacy-svg-target privacy-target">' + t + "</span>"
            },
            backgroundColor: "rgba(77, 110, 157, 1)"
          }
        },
        gridLineDashStyle: 'ShortDot',
      }],
      plotOptions: {
        areaspline: {
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
          fillOpacity: .2
        }
      },
      series: [{
        name: 'Profit',
        type: "areaspline",
        color: "#4d6e9d",
        fillColor: {
          linearGradient: {x1: 0, x2: 0, y1: 0, y2: 300},
          stops: [[0, "rgba(77, 110, 157, 0.15)"], [1, "rgba(77, 110, 157, 0)"]]
        },
        data: data
      }],
      tooltip: {
        // formatter: function (t) {
        //   return false
        // }
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      }
    }
  }

  filterPredicate(filters: Filter[], trade: Trade): boolean {
    if (!filters) return true
    let res = true;
    filters.forEach(filter => {
      if (!filter) return
      switch (filter.strOperation) {
        case '<':
          res = res && trade[filter.property] < filter.value
          break
        case '==':
          res = res && trade[filter.property] == filter.value
          break
        case '>':
          res = res && trade[filter.property] > filter.value
          break
        case 'includes':
          res = res && trade[filter.property].includes(filter.value)
          break
      }
    })
    return res;
  }

  ngOnInit(): void {
    this.modelService.model$.subscribe(model => {
      this.model = model
    })

    this.filters$ = this.modelService.listenModel(this.model.id).pipe(
      map(model => model.filters)
    )

    this.trades$ = this.modelService.getTrades(this.model.id).pipe(
      map(trades => {
        this.notification.info("Updating...")
        return trades
      }),
      switchMap(trades => {
        return this.filters$.pipe(
          map(filters => trades.filter(trade => this.filterPredicate(filters, trade)))
        )
      }),
    )

    this.modelStats$ = this.trades$.pipe(
      switchMap(trades => of(this.modelService.computeModelStats(trades)))
    )

    this.getModelPropreties(this.model)

    this.modelStats$.subscribe(stats => {
      this.updateWinrateChart(stats.winCount, stats.lossCount)
      this.updateDirectionChart(stats.longCount, stats.shortCount)
      this.updateBChart(stats.winAvg, stats.lossAvg)
      this.updateChart(stats.profitArr)
      // this.updateChart(stats.highchartProfit)
    })
  }

  addEntry() {
    let data = {modelId: this.model.id}
    let dialogRef = this.dialog.open(AddTradeComponent, {data: data})

    dialogRef.afterClosed().subscribe(result => {
      this.notification.info(`Dialog result: ${result}`)
    })
  }

  remove(filterTag: Filter): void {
    this.modelService.updateModel(this.model.id, {
      filters: firestore.FieldValue.arrayRemove(filterTag)
    })
      .then(() => this.notification.success("Deleted filter"))
      .catch(err => this.notification.error(err))
  }

  getAllTags(data) {
    data.forEach(trade => {
      if (trade.tags != null)
        trade.tags.forEach(tag => {
          this.modelTags.add(tag.name)
        });
    })
    this.modelTags.forEach(tagName => {
      // this.dimensionGroups[2].dimension.push({value: tagName.toString(), viewValue: tagName.toString()})
    })
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  getModelPropreties(model) {
    this.modelService.listenModelPropreties(model.id).subscribe(data => {
      this.modelPropreties = data
      this.modelPropreties.forEach(modelPropreties => {
        // this.dimensionGroups[1].dimension.push({
        //   value: modelPropreties.name.toString(),
        //   viewValue: modelPropreties.name.toString()
        // })
      })
    })
  }
}
