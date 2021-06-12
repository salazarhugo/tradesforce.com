import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {FormControl} from '@angular/forms';
import {map, startWith, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Stock} from 'src/app/core/models/stock.model';
import {PortfolioService} from 'src/app/portfolio/services/portfolio.service';
import {IexApiService} from "../../../core/http/iexcloud/iex-api.service";

@Component({
  selector: 'app-dialog-add-stock',
  templateUrl: './dialog-add-stock.component.html',
  styleUrls: ['./dialog-add-stock.component.sass']
})
export class DialogAddStockComponent implements OnInit {
  visible = true
  selectable = true
  removable = true
  separatorKeysCodes: number[] = [ENTER, COMMA]
  tagCtrl = new FormControl()
  symbolControl = new FormControl()
  filteredTags: Observable<string[]>
  allTags = []

  stock = new Stock()
  filteredSymbols: Observable<any[]>;

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    public dialogRef: MatDialogRef<DialogAddStockComponent>,
    @Inject(MAT_DIALOG_DATA) public portfolioId: string,
    public auth: AngularFireAuth,
    public firestore: AngularFirestore,
    private http: HttpClient,
    private portfolioService: PortfolioService,
    private iexService: IexApiService
  ) {

    this.stock.portfolioId = portfolioId
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(''),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));
  }

  ngOnInit(): void {
    this.getAllTags();
    this.filteredSymbols = this.symbolControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => {
        if (!value) return []
        return this.iexService.search(value)
      })
    )
  }

  async getAllTags() {
    const currentUser = await this.auth.currentUser

    this.firestore.collection('users').doc(currentUser.uid).collection('tags').get().subscribe((data) => {
      data.docs.forEach((doc) => {
        this.allTags.push(doc.data());
      })
    });
  }

  async addStock() {
    const currentUser = await this.auth.currentUser
    let tags = [];

    this.stock.uid = currentUser.uid
    this.stock.currency = "USD"

    this.portfolioService.addStock(this.stock.portfolioId, this.stock).then(res => {
      console.log("Document successfully added!" + res);
      this.dialogRef.close();
    })
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
