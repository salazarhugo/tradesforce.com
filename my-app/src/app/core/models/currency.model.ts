import {CurrencyIsoCode} from "../enums/currency.enum";
import {AppConstants} from "../constants/app.constant";

export class Currency {
  name: string
  iso_code: CurrencyIsoCode
  symbol: string

  constructor() {
    const usd = AppConstants.CURRENCIES.find(r => r.iso_code == "USD")
    this.name = usd.name
    this.iso_code = usd.iso_code
    this.symbol = usd.symbol
  }
}
