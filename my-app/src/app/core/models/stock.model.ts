export class Stock {
  id: string
  uid: string
  symbol: string
  companyName: string
  currency: string
  quantity: number
  intrinsicValue: number
  averagePrice: number
  tags: Array<any>
  color: string = "#3388ff"
  portfolioId: string
  region: string
  marketValue: number
  primaryExchange: string
  latestPrice: number
  latestTime: string
  latestSource: string
  change: number
  changePercent: number

  constructor() {
    this.id = ""
    this.portfolioId = ""
    this.symbol = ""
    this.currency = ""
    this.quantity = null
    this.intrinsicValue = null
    this.color = "#3388ff"
    this.averagePrice = null
    this.latestPrice = null
    this.tags = []
    this.uid = ""
    this.region = ""
  }
}
