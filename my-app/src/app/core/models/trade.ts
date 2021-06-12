import { Tag } from './tag.model';
import firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export enum TradeDirection {
  LONG = "LONG",
  SHORT = "SHORT"
}

export class Trade {
  id: string
  type?: string
  modelId: string
  userId: string
  timeframe: string
  entryprice: number
  entrydate: Date
  exitprice: number
  exitdate: Date
  symbol: string
  outcome: string
  riskreward: string
  takeprofit: number
  stoploss: number
  quantity: number
  profit: number
  direction: TradeDirection
  commission?: number
  swap?: number
  comment: string
  images?: Array<any>
  valid?: boolean
  propreties?: object
  tags?: Array<Tag>
}
