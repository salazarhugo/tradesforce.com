
export class HighchartData {
  name: string
  y: number
  color?: string

  constructor(name: string, y: number, color?: string) {
    this.name = name
    this.y = y
    this.color = color
  }
}
