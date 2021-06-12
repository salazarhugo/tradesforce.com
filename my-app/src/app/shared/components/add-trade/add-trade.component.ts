import {Component, Inject, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Trade, TradeDirection} from 'src/app/core/models/trade';


@Component({
  selector: 'app-add-trade',
  templateUrl: './add-trade.component.html',
  styleUrls: ['./add-trade.component.sass']
})
export class AddTradeComponent implements OnInit {

  trade: Trade = new Trade()

  constructor(
    public dialogRef: MatDialogRef<AddTradeComponent>,
    public auth: AngularFireAuth,
    public afs: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: { modelId: string }
    ) {
  }

  ngOnInit(): void {
  }

  addTrade(trade: Trade) {
    trade.modelId = this.data.modelId
    trade.outcome = trade.profit > 0 ? "WIN" : "LOSS"
    trade.entrydate = new Date(trade.entrydate);
    trade.exitdate = new Date(trade.exitdate);

    this.auth.user.subscribe(user => {
        trade.userId = user.uid
        const tradeDocId = this.afs.createId();
        trade.id = tradeDocId
        this.afs.collection('trades').doc(tradeDocId).set(Object.assign({}, trade)).then(() => {
          console.log("Document successfully added!");
          this.dialogRef.close();
        });
      })
  }

  ToArray(): TradeDirection[] {
    return Object.keys(TradeDirection)
      .map(k => TradeDirection[k])
  }

  addMockTrade() {
    const trade: Trade = {
      userId: "",
      direction: TradeDirection.LONG,
      id: "",
      modelId: "",
      outcome: "",
      quantity: 700,
      riskreward: "",
      timeframe: "",
      symbol : "EURUSD",
      comment : "Nice -_-",
      commission : 5.21,
      profit : Math.random() * 100,
      entrydate : new Date(),
      entryprice : 1.001,
      exitprice : 1.082,
      takeprofit : 1.082,
      stoploss : 0.987,
      exitdate : new Date()
    }
    this.addTrade(trade)
  }
}
