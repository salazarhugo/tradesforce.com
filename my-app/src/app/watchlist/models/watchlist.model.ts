export class Watchlist {
  id: string = ""
  uid: string = ""
  name: string = ""
  stockCount: number = 0

  constructor(uid?: string, name?: string) {
    this.uid = uid
    this.name = name
  }
}
