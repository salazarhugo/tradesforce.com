import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { DatePipe } from '@angular/common';
import {Observable} from "rxjs/internal/Observable";
import {Trade} from "../../../core/models/trade";

@Component({
  selector: 'app-table-forex',
  templateUrl: './table-forex.component.html',
  styleUrls: ['./table-forex.component.sass']
})
export class TableForexComponent implements OnInit {

  displayColumns = [
    'symbol',
    'entrydate',
    'direction',
    'quantity',
    // 'strategy',
    'entryprice',
    'exitdate',
    'exitprice',
    'profit',
    'valid',
    'comment',
    'controls'
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() trades$: Observable<Trade[]>

  dataSource: MatTableDataSource<Trade>

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public firestoreService: FirestoreService
  ) { }

  ngOnInit() {
    this.trades$.subscribe(trades => {
      this.dataSource = new MatTableDataSource<Trade>(trades)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })

    if (window.screen.width < 768) { // 768px portrait
      this.displayColumns = ['entrydate', 'type', 'quantity', 'symbol', 'profit', 'valid', 'controls']
    }
  }

  ngOnChanges() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource.sort)
  }

  navigateToTradeDetails(row) {
    this.trades$.subscribe(trades => {
      const trade = trades.find(t => t.id == row.id)
      this.router.navigate(["console/t/" + trade.id], {state: trade})
        .then(r => console.log(r));
    })
  }

  // naviguateToTradeDetails(trade) {
  //   this.router.navigate(['trade', { id: trade.tid, relativeTo: this.route }])
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteTrade(tradeId) {
    this.firestoreService.deleteTrade(tradeId).then(() => {
      console.log("Document successfully deleted")
    })
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
