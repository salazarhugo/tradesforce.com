import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {HighchartData} from "../../../core/models/highchart-data.model";
import { Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-sector-distribution',
  templateUrl: './sector-distribution.component.html',
  styleUrls: ['./sector-distribution.component.sass']
})
export class SectorDistributionComponent implements OnInit {

  @Input() title: string
  @Input() data: Observable<HighchartData[]>
  @Input() user: Observable<any>
  @Input() hideTable: boolean = false

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options
  chart: Highcharts.Chart

  total: number = 0

  constructor() {
  }

  dataSubscription: Subscription

  ngOnDestroy() {
    if (this.dataSubscription)
      this.dataSubscription.unsubscribe()
  }

  ngOnChanges(): void {
    this.dataSubscription = this.data.subscribe(res => {
      this.updateChart(res)
      this.computeTotal(res)
    })
  }

  ngOnInit(): void {
  }

  updateChart(data: any) {
    let a = this
    this.chartOptions = {
      chart: {
        type: 'pie',
        backgroundColor: null,
      },
      title: {
        text: null
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
        name: 'NAV',
        type: "pie",
        data: data,
        colorByPoint: true,
        innerSize: '60%',
        dataLabels: {
          enabled: false,
        },
      }],
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormatter: function () {
          // return 'The value for <b>' + this.x + '</b> is <b>' + this.y + '</b>, in series '+ this.series.name;
          return this.series.name + ': <b>' + this.y + '</b> (' + Math.round(100 * this.y / a.total) + '%)';
        },
      }
    }
  }

  onChartInstance(chart) {
    this.chart = chart
  }

  getPercentage(index) {
    if (!this.chart) return
    return this.chart.series[0].data[index].percentage.toFixed(2)
  }

  getSectorColor(index) {
    if (!this.chart) return
    return this.chart.series[0].data[index].color
  }

  computeTotal(data: HighchartData[]) {
    this.total = 0
    data.forEach(res => this.total += res.y)
  }
}
