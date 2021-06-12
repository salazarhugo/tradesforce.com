import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ThemePalette} from '@angular/material/core';

export interface Column {
  name: string;
  displayName: string;
  show: boolean;
  color?: ThemePalette;
}

@Component({
  selector: 'colomns-checkbox',
  templateUrl: './columns-checkbox.component.html',
  styleUrls: ['./colomns-checkbox.component.sass']
})
export class ColumnsCheckboxComponent implements OnInit {

  @Input() columns: Array<Column>;
  @Output() update = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  allShow: boolean = false;

  updateAllShow() {
    this.allShow = this.columns != null && this.columns.every(t => t.show);
  }

  someComplete(): boolean {
    if (this.columns == null) {
      return false;
    }
    return this.columns.filter(t => t.show).length > 0 && !this.allShow;
  }

  setAll(show: boolean) {
    this.allShow = show;
    if (this.columns == null) {
      return;
    }
    this.columns.forEach(t => t.show = show);
  }

  apply() {
    this.update.emit(true);
  }
}
