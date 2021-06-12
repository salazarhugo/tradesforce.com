import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'country-flag',
  templateUrl: './country-flag.component.html',
  styleUrls: ['./country-flag.component.sass']
})
export class CountryFlagComponent implements OnInit {

  @Input() country: string

  constructor() { }

  ngOnInit(): void {
  }

}
