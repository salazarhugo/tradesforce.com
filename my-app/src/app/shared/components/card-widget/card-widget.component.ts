import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'card-widget',
  templateUrl: './card-widget.component.html',
  styleUrls: ['./card-widget.component.sass']
})
export class CardWidgetComponent implements OnInit {

  @Input() title: string
  @Input() divider: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

}
