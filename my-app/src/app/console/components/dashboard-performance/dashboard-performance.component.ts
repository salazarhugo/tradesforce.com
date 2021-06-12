import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {FirestoreService} from "../../../services/firestore.service";
import {Observable} from "rxjs/internal/Observable";
import {ModelStats} from "../../../core/models/modelStats.model";
import {Trade} from "../../../core/models/trade";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'dashboard-performance',
  templateUrl: './dashboard-performance.component.html',
  styleUrls: ['./dashboard-performance.component.sass']
})
export class DashboardPerformanceComponent implements OnInit {

  @Input() title: string
  @Input() modelStats: ModelStats

  data: Array<number>
  user: Observable<any>

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options

  constructor(
    private fs: FirestoreService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {

    this.fs.col$<Trade>(this.fs.database.trades.ref.path, ref => ref
      .where('userId', '==', this.userService.user$.value.uid)
      .orderBy('entrydate'))
      .subscribe(trades => {

        const data = [];
        let profitSum = 0;
        for (let i = 0; i < trades.length; i++) {
          profitSum += trades[i].profit
          // data.push({x: (trades[i].entrydate as any).toDate(), y: profitSum })
          data.push(profitSum);
        }

        this.updateChart(data)
      })

    this.user = this.fs.docUser$()
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
        type: "datetime",
        currentDateIndicator: true,
        crosshair: {
          label: {
            enabled: true,
            formatter: function (t) {
              return '<span class="privacy-svg-target privacy-target">' + "</span>"
            },
            backgroundColor: "rgba(77, 110, 157, 1)"
          }
        },
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
        name: 'NAV',
        type: "areaspline",
        color: "#4d6e9d",
        fillColor: {
          linearGradient: {x1: 0, x2: 0, y1: 0, y2: 300},
          stops: [[0, "rgba(77, 110, 157, 0.15)"], [1, "rgba(77, 110, 157, 0)"]]
        },
        data: data
      }],
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      }
    }
  }
}
