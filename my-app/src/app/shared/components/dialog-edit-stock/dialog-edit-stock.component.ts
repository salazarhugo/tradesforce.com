import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {MatChipInputEvent} from '@angular/material/chips';
import {AngularFireAuth} from '@angular/fire/auth'
import {AngularFirestore} from '@angular/fire/firestore'
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Stock} from 'src/app/core/models/stock.model';
import {PortfolioService} from 'src/app/portfolio/services/portfolio.service';

@Component({
  selector: 'app-dialog-edit-stock',
  templateUrl: './dialog-edit-stock.component.html',
  styleUrls: ['./dialog-edit-stock.component.sass']
})

export class DialogEditStockComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  allTags = [];

  stock = new Stock();

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    public dialogRef: MatDialogRef<DialogEditStockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Stock,
    public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    private portfolioService: PortfolioService
  ) {
    this.stock = data;
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  ngOnInit(): void {
  }

  updateStock() {
    this.portfolioService.updateStock(this.stock).then(res => {
      console.log("Document successfully updated!" + res);
      this.dialogRef.close();
    });
  }

  deleteStock() {
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our tag
    if (value || '') {
      this.stock.tags.push(value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.stock.tags.indexOf(tag);

    if (index >= 0) {
      this.stock.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.stock.tags.push(event.option.value);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}
