import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreService } from 'src/app/services/firestore.service';
import { DatePipe } from '@angular/common';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-home-trading',
  templateUrl: './home-trading.component.html',
  styleUrls: ['./home-trading.component.sass']
})
export class HomeTradingComponent implements OnInit {

  displayColumns = [/*'entrydate',*/ 'type', 'quantity', 'symbol', 'strategy', /*'entryprice',/* 'exitdate' 'exitprice'*/ 'profit', 'valid', 'comment']
  dataSource: MatTableDataSource<any>

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort
  constructor(public firestore: AngularFirestore, public auth: AngularFireAuth, public firestoreService: FirestoreService, public indexService: IndexService) { }


  ngOnInit(): void {
    this.listenStockTrades()
  }

  /** Load trades stocks into table */
  listenStockTrades() {
    this.dataSource = new MatTableDataSource(this.indexService.stockTradingData)
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
  }

  renderTable__date(date) {
    if (date == undefined || date == "" || date == null) return "";
    let pipe = new DatePipe('en')
    var today = new Date().setHours(0, 0, 0, 0);
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    var entrydate = date.toDate().setHours(0, 0, 0, 0);
    if (entrydate == today)
      return 'Today';
    if (entrydate == yesterday)
      return 'Yesterday'
    return pipe.transform(entrydate, 'MMM d');
  }

  renderTable__price(price) {
    if (price == undefined || price == "" || price == null) return 0;

    var x = Math.abs(price);
    var sign = Math.sign(price);

    if (x >= 1000000000)
      return (sign * x / 1000000000).toFixed(2) + 'B';
    if (x >= 1000000)
      return (sign * x / 1000000).toFixed(2) + 'M';
    if (x >= 1000)
      return (sign * x / 1000).toFixed(1) + 'K';
    return price.toFixed(2);
  }
}
