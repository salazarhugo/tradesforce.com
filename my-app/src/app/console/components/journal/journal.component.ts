import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth'
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog'
import { FirestoreService } from 'src/app/services/firestore.service';
import { AddTradeComponent } from 'src/app/shared/components/add-trade/add-trade.component';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.sass']
})
export class JournalComponent implements OnInit {

  user: any
  reports = []

  constructor(public firestore: AngularFirestore, public auth: AngularFireAuth, public dialog: MatDialog, public firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user
        this.listenTrades()
      } else {
        // No user is signed in.
      }
    })
  }

  openAddTradeDialog() {
    const dialogRef = this.dialog.open(AddTradeComponent, {
      panelClass: 'myapp-border-radius-12-dialog'
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    })
  }

  getTradesByMonth(data: Array<any>, month: number, year: number) {
    let trades = []
    data.forEach(tradeDoc => {
      if (tradeDoc.exitdate.toDate().getMonth() == month && tradeDoc.exitdate.toDate().getFullYear() == year)
        trades.push(tradeDoc)
    })
    return trades
  }

  /** Load trades stocks into table */
  listenTrades() {
    this.firestoreService.listenTrades().subscribe(data => {
      let oldestTradeDate: any = { seconds: 9999999999 }
      data.forEach(element => {
        if (element.exitdate['seconds'] < oldestTradeDate.seconds)
          oldestTradeDate = element.exitdate
      });

      let pipe = new DatePipe("en")
      let i: Date = new Date()
      while (i >= oldestTradeDate.toDate()) {
        this.reports.push({ month: pipe.transform(i, "MMMM y"), trades: this.getTradesByMonth(data, i.getMonth(), i.getFullYear()) })
        i = new Date(i.setMonth(i.getMonth() - 1))
      }
    })
  }

  getTotalProfit(trades: Array<any>) {
    return trades.reduce((acc, profit) => acc + profit.profit, 0).toFixed(2)
  }
}
