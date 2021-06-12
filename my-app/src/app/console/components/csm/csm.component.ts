import {Component, OnInit} from '@angular/core';
import {IexApiService} from 'src/app/core/http/iexcloud/iex-api.service';

@Component({
  selector: 'app-csm',
  templateUrl: './csm.component.html',
  styleUrls: ['./csm.component.sass']
})
export class CsmComponent implements OnInit {

  rsis = [
    ["USDCHF", 0], ["GBPUSD", 0], ["EURUSD", 0], ["USDJPY", 0],
    ["USDCAD", 0], ["AUDUSD", 0], ["EURGBP", 0], ["EURAUD", 0],
    ["EURCHF", 0], ["EURJPY", 0], ["GBPCHF", 0], ["CADJPY", 0],
    ["GBPJPY", 0], ["AUDNZD", 0], ["AUDCAD", 0], ["AUDCHF", 0],
    ["AUDJPY", 0], ["CHFJPY", 0], ["EURNZD", 0], ["EURCAD", 0],
    ["CADCHF", 0], ["NZDJPY", 0], ["NZDUSD", 0], ["GBPAUD", 0],
    ["GBPCAD", 0], ["GBPNZD", 0], ["NZDCAD", 0], ["NZDCHF", 0]
  ]

  currencies = [
    ["USD", 0], ["EUR", 0], ["GBP", 0], ["AUD", 0], ["NZD", 0], ["CAD", 0], ["CHF", 0], ["JPY", 0]
  ]

  constructor(public iexService: IexApiService) {
  }

  ngOnInit(): void {
    this.loadRsis()
    this.currencies.forEach(currency => {
      let sum = 0
      this.rsis.forEach(rsi => {
        /*if (rsi[0].includes(currency[0])) {
          sum += Number(rsi[1])
        }*/
      });
      currency[1] = sum
    })
  }

  loadRsis() {
    this.rsis.forEach(pair => {
      this.iexService.getRsi(pair[0]).then(res => {
        pair[1] = Number(res)
      })
    });
    console.log(this.rsis)
  }
}
