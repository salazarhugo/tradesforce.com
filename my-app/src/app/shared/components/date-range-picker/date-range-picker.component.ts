import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.sass']
})
export class DateRangePickerComponent implements OnInit {

  selectedValue

  constructor() { }

  ngOnInit(): void {
  }

}
