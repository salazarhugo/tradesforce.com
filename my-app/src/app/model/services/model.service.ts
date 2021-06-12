import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Model} from '../../core/models/model.model';
import {Proprety} from '../../core/models/proprety.model';
import {FirestoreService} from '../../services/firestore.service';
import {Trade, TradeDirection} from "../../core/models/trade";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {ModelStats} from "../../core/models/modelStats.model";
import {UserService} from "../../services/user.service";
import {NotificationService} from "../../services/notification/notification.service";

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private _model = new BehaviorSubject<Model>(new Model())
  model$ = this._model.asObservable()

  private _trades = new BehaviorSubject<Trade[]>([])
  trades$ = this._trades.asObservable()

  public allTrades = new BehaviorSubject<Trade[]>([])

  modelsCol = this.fs.getUserDocument().collection('models').ref
  tradesCol: AngularFirestoreCollection = this.afs.collection('trades')

  constructor(
    public afs: AngularFirestore,
    public fs: FirestoreService,
    public userService: UserService,
    private notification: NotificationService,
  ) {
  }

  setModel(model: Model): void {
    this._model.next(model);
    console.log(model)
  }

  getModels$(): Observable<Model[]> {
    return this.fs.col$<Model>(this.modelsCol.path)
  }

  listenModel(modelId): Observable<Model> {
    return this.fs.doc$<Model>(`${this.modelsCol.path}/${modelId}`)
  }

  listenModels(): Observable<any> {
    return this.fs.col$(this.modelsCol.path)
  }

  getTrades(modelId): Observable<Trade[]> {
    return this.fs.col$<Trade>(this.tradesCol.ref.path, ref => ref
      .where('userId', '==', this.userService.user$.value.uid)
      .where('modelId', '==', modelId)
      .orderBy('entrydate', 'asc'))
  }

  addModel(model) {
    this.fs.addWithId$(this.modelsCol.path, model).then(doc => {
      let a = ["tid", "timeframe", "entryprice", "entrydate", "exitprice", "exitdate", "symbol", "outcome", "riskreward", "takeprofit", "stoploss", "strategy", "object", "quantity", "profit", "direction", "commission?", "comment", "images? Array<any>", "valid?", "boolean", "tags"]
      let properties = a.map(s => new Proprety(s))
      properties.forEach(p => {
        this.addModelProprety(doc.id, p)
          .then(() => this.notification.success("Added model property"))
          .catch(err => this.notification.error(err))
      })
    })
  }

  deleteModel(modelId: string): Promise<void> {
    return this.modelsCol.doc(modelId).delete()
  }

  updateModel(modelId: string, value: any): Promise<void> {
    return this.modelsCol.doc(modelId).update(value)
  }

  listenModelPropreties(modelId: string): Observable<any> {
    return this.fs.colWithIds$(`${this.modelsCol.path}/${modelId}/propreties`)
  }

  addModelProprety(modelId: string, proprety: Proprety) {
    return this.modelsCol.doc(modelId).collection('propreties').add(Object.assign({}, proprety))
  }

  updateModelProprety(modelId: string, proprety): Promise<void> {
    return this.modelsCol.doc(modelId).update(proprety)
  }

  deleteModelProprety(modelId: string, propretyId: string): Promise<void> {
    return this.modelsCol.doc(`${modelId}/propreties/${propretyId}`).delete()
  }

  computeModelStats(trades: Array<Trade>): ModelStats {
    let stats: ModelStats = {
      commissionSum: 0,
      swapSum: 0,
      expectancy: 0,
      lossAvg: 0,
      lossCount: 0,
      lossRate: 0,
      lossSum: 0,
      profitArr: [],
      profitMax: 0,
      profitMin: 0,
      profitSum: 0,
      quantitySum: 0,
      tradeDurationAvg: new Date(),
      tradeDurationTotal: 0,
      winAvg: 0,
      winCount: 0,
      winRate: 0,
      winSum: 0,
      longCount: 0,
      shortCount: 0,
      highchartProfit: [],
    }

    trades.forEach(trade => {
      if (trade == undefined) return

      this.countModel(trade)
      this.countProfit(stats, trade.entrydate, trade.profit)
      this.countCommission(stats, trade.commission)
      this.countSwap(stats, trade.swap)
      stats.longCount += trade.outcome == TradeDirection.LONG ? 1 : 0;
      stats.shortCount += trade.outcome == TradeDirection.SHORT ? 1 : 0;
    })

    stats.winRate = stats.winCount / trades.length * 100
    stats.winAvg = stats.winSum / stats.winCount
    stats.lossAvg = stats.lossSum / stats.lossCount
    stats.expectancy = (stats.winRate * stats.winAvg) - (stats.lossRate * Math.abs(stats.lossAvg))
    stats.profitSum = Math.round(stats.profitSum * 100) / 100

    return stats
  }

  countHighchartProfit(stats: ModelStats, entrydate: any, profit: number) {
    stats.highchartProfit.push({x: entrydate.toDate(), y: profit});
  }

  countProfit(stats: ModelStats, entrydate, profit: number) {
    if (!profit) return
    stats.profitSum += profit
    this.countHighchartProfit(stats, entrydate, stats.profitSum)
    stats.profitArr.push(stats.profitSum)
    stats.profitMax = Math.max(stats.profitMax, profit)
    stats.profitMin = Math.min(stats.profitMax, profit)

    if (profit > 0) {
      stats.winCount++
      stats.winSum += profit
    } else {
      stats.lossCount++
      stats.lossSum += profit
    }
  }

  countSwap(stats: ModelStats, swap: number) {
    if (!swap) return
    stats.swapSum += swap
  }

  countCommission(modelStats: ModelStats, commission: number) {
    if (!commission) return
    modelStats.commissionSum += commission
  }

  countModel(trade: Trade) {
    if (!trade.modelId) return
  }

  countQuantity(modelStats: ModelStats, quantity: number) {
    if (!quantity) return
    modelStats.quantitySum += quantity
  }
}
