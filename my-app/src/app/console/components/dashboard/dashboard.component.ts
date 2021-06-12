import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {MatTableDataSource} from '@angular/material/table'
import {FormControl, FormGroup} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirestoreService} from 'src/app/services/firestore.service';
import {UserService} from 'src/app/services/user.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Model} from "../../../core/models/model.model";
import {ModelService} from "../../../model/services/model.service";
import {IexApiService} from "../../../core/http/iexcloud/iex-api.service";
import {ModelStats} from "../../../core/models/modelStats.model";
import {Trade} from "../../../core/models/trade";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  modelStats: ModelStats

  profit: Array<number>
  dataSource: MatTableDataSource<any>
  displayColumns = ['symbol', 'type', 'quantity', 'profit']
  currencies = ['EUR', 'USD', 'CHF', 'JPY', 'NZD', 'GBP', 'CAD']
  tags = []
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(
    private userService: UserService,
    public firestoreService: FirestoreService,
    private firestore: AngularFirestore,
    private modelService: ModelService,
    private iexApiService: IexApiService
  ) {
  }

  ngOnInit(): void {
    const a = new BehaviorSubject<number>(0);
    a.next(3)
    a.next(4)
    a.subscribe(res => console.log(res))
    // a.next(5)
    // a.next(6)

    this.listenTrades()
  }

  a: Observable<any>

  b(price: any) {
  }

  modelsIds: Set<any> = new Set()
  dataAvailable = false

  /** Load trades stocks into table */
  listenTrades() {
    this.firestoreService.listenTrades(this.range.value.start, this.range.value.end).subscribe(trades => {
      if (trades.length === 0) {
        return;
      }
      trades = trades.reverse()
      this.modelStats = this.modelService.computeModelStats(trades)
      this.dataSource = new MatTableDataSource(trades.slice(0, 8))
      this.dataAvailable = true
    })
  }

  /**  */
  renderTable__price(price) {
    if (price == undefined || price == "" || price == null) return 0;

    let x = Math.abs(price);
    let sign = Math.sign(price);

    if (x >= 1000000000)
      return (sign * x / 1000000000).toFixed(2) + 'B';
    if (x >= 1000000)
      return (sign * x / 1000000).toFixed(2) + 'M';
    if (x >= 1000)
      return (sign * x / 1000).toFixed(1) + 'K';
    return price.toFixed(2);
  }

  renderTable__date(date) {
    if (date == undefined || date == "" || date == null) return "";
    let pipe = new DatePipe('en')
    var today = new Date().setHours(0, 0, 0, 0);
    var entrydate = date.toDate().setHours(0, 0, 0, 0);
    if (entrydate == today)
      return 'Today';
    return pipe.transform(entrydate, 'y-MM-d');
  }
}
