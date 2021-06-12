import {Component, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import * as HighchartsExporting from "highcharts/modules/exporting";
import * as HighchartsExportData from "highcharts/modules/export-data";

HighchartsExporting.default(Highcharts);
HighchartsExportData.default(Highcharts);

@Component({
  selector: 'app-world-forex-hours',
  templateUrl: './world-forex-hours.component.html',
  styleUrls: ['./world-forex-hours.component.sass']
})
export class WorldForexHoursComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options
  chart: Highcharts.Chart

  timezones = [
    {value: 0, viewValue: 'GMT+0'},
    {value: 1, viewValue: 'GMT+1'},
    {value: 2, viewValue: 'GMT+2'},
    {value: 3, viewValue: 'GMT+3'},
    {value: 4, viewValue: 'GMT+4'},
    {value: 5, viewValue: 'GMT+5'},
    {value: 6, viewValue: 'GMT+6'},
    {value: 7, viewValue: 'GMT+7'},
    {value: 8, viewValue: 'GMT+8'},
    {value: 9, viewValue: 'GMT+9'},
    {value: 10, viewValue: 'GMT+10'},
    {value: 11, viewValue: 'GMT+11'},
  ]

  currencies = [
    {currency: 'EUR', offset: 1, hours: [9, 17.5]},
    {currency: 'CHF', offset: 1, hours: [9, 17.5]},
    {currency: 'GBP', offset: 0, hours: [8, 16]},
    {currency: 'USD', offset: -5, hours: [8, 17]}, // New york
    {currency: 'CAD', offset: -5, hours: [8, 17]}, // Toronto
    {currency: 'AUD', offset: 11, hours: [8, 17]}, // Sydney
    {currency: 'JPY', offset: 9, hours: [8, 17]},
    {currency: 'NZD', offset: 13, hours: [8, 17]}
  ]

  constructor() {
  }

  ngOnInit(): void {
    this.updateChart(this.timezones[0])
  }

  mod(a, n) {
    return ((a % n) + n) % n;
  }

  addHours = function (d, h) {
    d.setTime(d.getTime() + (h * 60 * 60 * 1000));
    return d;
  }

  updateChart(timezone) {
    const data = this.currencies.map(c =>
      c.hours.map(h => {
        const d = new Date()
        d.setHours(0, 0)
        return this.addHours(d, (h - c.offset + timezone.value) + 1).getTime()
      })
    )

    this.chartOptions = {
      chart: {
        type: 'columnrange',
        inverted: true,
        backgroundColor: null,
      },
      title: {
        text: 'World Forex Trading Hours'
      },
      subtitle: {
        text: null
      },
      xAxis: {
        categories: this.currencies.map(c => c.currency)
      },
      yAxis: {
        title: {
          text: 'Hours'
        },
        type: 'datetime',
        plotLines: [{
          color: '#FF0000', // Red
          width: 2,
          zIndex: 10,
          value: Date.now() + (60 * 60 * 1000 * timezone.value)
        }]
        // labels: {
        //   format: '{value:%e-%b}'
        // },
      },
      tooltip: {
        valueSuffix: '',
        // formatter: function () {
        //   return '<b>' + this.series.name + '</b><br/>' +
        //     Highcharts.dateFormat('%H:%M ',
        //       this.point.low) + ' to ' +
        //     Highcharts.dateFormat('%H:%M',
        //       this.point.high)
        // }
      },
      plotOptions: {
        columnrange: {}
      },
      series: [{
        name: 'Trading Hours',
        type: "columnrange",
        data: data,
        colorByPoint: true,
        dataLabels: {
          enabled: false,
        },
      }],
      exporting: {
        enabled: true,
        buttons: {
          contextButton: {
            menuItems: ['viewFullscreen', "printChart", "separator", "downloadPNG", "downloadPDF"]
          }
        }
      },
      credits: {
        enabled: false
      },
    }
  }
}

