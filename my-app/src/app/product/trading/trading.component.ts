import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AngularFireAuth} from '@angular/fire/auth';
import {TradeDirection, Trade} from 'src/app/core/models/trade';
import {AuthComponent} from 'src/app/auth/auth.component';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.sass']
})
export class TradingComponent implements OnInit {

  constructor(public dialog: MatDialog, public auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  trade: Trade = {
    id: "",
    modelId: "",
    userId: "",
    timeframe: "H4",
    entryprice: 1.12100,
    entrydate: new Date(),
    exitprice: 1.124,
    exitdate: new Date(),
    symbol: "EURUSD",
    outcome: "WIN",
    riskreward: "0",
    takeprofit: 0,
    stoploss: 1.11900,
    quantity: 0,
    profit: 0,
    direction: TradeDirection.LONG,
    commission: 0,
    comment: "Haha",
    valid: true
  }
  openLoginDialog() {
    const dialogRef = this.dialog.open(AuthComponent, {
      panelClass: 'lars-login-dialog'
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    })
  }
}
