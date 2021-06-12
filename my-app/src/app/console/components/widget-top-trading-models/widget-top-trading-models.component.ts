import {Component, Input, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts';
import {Observable} from 'rxjs/internal/Observable';
import {ModelService} from '../../../model/services/model.service';

@Component({
  selector: 'widget-top-trading-models',
  templateUrl: './widget-top-trading-models.component.html',
  styleUrls: ['./widget-top-trading-models.component.sass']
})
export class WidgetTopTradingModelsComponent implements OnInit {

  @Input() modelsIds: Set<string>
  models = []
  isLoading = true
  chartCallback: (chart: any) => void;
  chart: any;

  public trades: Observable<any>
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor(
    private ms: ModelService
  ) {
    const self = this;

    this.chartCallback = chart => {
      self.chart = chart;
    };
  }

  ngOnInit(): void {
    this.fetchModels()
  }

  ngOnChanges() {
    this.fetchModels()
  }

  fetchModels() {
    this.modelsIds.forEach(modelId => {
      this.ms.listenModel(modelId).subscribe(model => {
        this.models.push(model)
        console.log(this.models)
      })
    })
    this.chartOptions = {
      chart: {
        type: 'bar',
        backgroundColor: null,
        spacingLeft: 10,
        marginBottom: 30,
      },
      title: {
        text: null
      },
      subtitle: {
        text: null
      },
      xAxis: {},
      yAxis: {
        title: {
          text: null
        },
        labels: {
          enabled: true
        },
        gridLineDashStyle: 'LongDash',
        tickAmount: 8
      },
      plotOptions: {
        bar: {}
      },
      series: [{
        name: 'Win rate',
        type: "bar",
        data: [3, 5, 5, 6, 7, 2, 6, 2,],
        dataSorting: {
          enabled: true
        },
        states: {
          hover: {
            enabled: true
          }
        },
      }],
      credits: {
        enabled: false
      },
    }
  }
}
