import {Component, OnInit} from '@angular/core';
import {of} from "rxjs";
import {HighchartData} from "../../core/models/highchart-data.model";
import {Observable} from "rxjs/internal/Observable";
import {Image} from "../../shared/components/carousel/carousel.component";
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-platform-overview',
  templateUrl: './platform-overview.component.html',
  styleUrls: ['./platform-overview.component.sass']
})
export class PlatformOverviewComponent implements OnInit {

  mockData: Observable<HighchartData[]>
  mockDataCustomTags: Observable<HighchartData[]>
  mockDataRegion: Observable<HighchartData[]>

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options
  chart: Highcharts.Chart

  images: Image[] = [
    {
      url: "assets/img/dashboard.png",
      caption: "Spark smarter decisions with business intelligence"
    },
  ]

  constructor() {
  }

  updateChart(data: any) {
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
        tickAmount: 8
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
    }
  }

  ngOnInit(): void {
    this.mockDataCustomTags = of([
      new HighchartData(
        "Europe",
        2337.46
      ),
      new HighchartData(
        "North America",
        2778.29
      ),
      new HighchartData(
        "Asia",
        2857.21
      ),
      new HighchartData(
        "Other",
        345.53
      )
    ])

    this.mockData = of([
      new HighchartData(
        "ADBE",
        780.05
      ),
      new HighchartData(
        "BA",
        1398.47
      ),
      new HighchartData(
        "BABA",
        2867.44
      ),
      new HighchartData(
        "BAC",
        2452.11
      ),
      new HighchartData(
        "BKNG",
        1783.23
      ),
      new HighchartData(
        "CME",
        1727.04
      ),
      new HighchartData(
        "CRM",
        1106.30
      ),
      new HighchartData(
        "EL",
        842.66
      ),
      new HighchartData(
        "FB",
        2672.45
      ),
      new HighchartData(
        "GOOGL",
        1562.34
      ),
      new HighchartData(
        "JPM",
        1795.15
      ),
      new HighchartData(
        "MCD",
        1586.03
      ),
      new HighchartData(
        "MSFT",
        1116.84
      ),
      new HighchartData(
        "VEEV",
        1188.34
      ),
      new HighchartData(
        "YUM",
        1444.13
      ),
      new HighchartData(
        "YUMC",
        2820.03
      )
    ])

    const profitData = [0]
    for (let i = 1; i < 100; i++) {
      profitData.push(profitData[i - 1] + this.getRandomArbitrary(-10000, 15000))
    }
    this.updateChart(profitData)
    //[ {x: new Date(), y: 55, color: '#ff0022'}]
  }

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }


}
