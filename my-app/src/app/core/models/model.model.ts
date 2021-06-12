import {Filter} from "../../model/components/filter-builder/filter-builder.component";

export class Model {
  id: string = ""
  name: string = ""
  financialMarket: string = ""
  status: boolean = true
  winRate: number = 0
  lossRate: number = 0
  winCount: number = 0
  winSum: number = 0
  winAvg: number = 0
  lossCount: number = 0
  lossSum: number = 0
  lossAvg: number = 0
  profitArr: Array<number> = []
  profitSum: number = 0
  profitMax: number = 0
  profitMin: number = 0
  commissionSum: number = 0
  quantitySum: number = 0
  expectancy: number = 0
  tradeDurationAvg: Date
  tradeDurationTotal: number = 0
  filters?: Filter[] = []

  constructor() {
  }
}
