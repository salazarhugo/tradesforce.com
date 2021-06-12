import {Currency} from "./currency.model";
import {AppConstants} from "../constants/app.constant";

export class Portfolio {
  id: string = ""
  uid: string = ""
  name: string = ""
  currency: Currency = AppConstants.CURRENCIES[0]
  status: boolean = true
  stockCount: number = 0

  constructor(uid?: string, name?: string, currency?: Currency) {
    this.uid = uid
    this.name = name
    this.currency = currency
  }
}
