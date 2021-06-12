import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pretty-span',
  templateUrl: './pretty-span.component.html',
  styleUrls: ['./pretty-span.component.sass']
})
export class PrettySpanComponent implements OnInit {

  @Input() number: number
  @Input() percent: boolean

  whole: string
  decimal: string

  constructor() {
  }

  ngOnChanges() {
    this.formatNumber(this.number)
  }

  ngOnInit(): void {
  }

  formatNumber(number: number): void {
    if (number == 0) {
      this.whole = "0"
      return
    }
    this.whole = Math.floor(number).toFixed(0) + '.'
    this.decimal = Math.abs(number % 1 * 100).toFixed(0)
    if (this.percent) this.decimal += ' %'
  }
}
