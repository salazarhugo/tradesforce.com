import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {FirestoreService} from 'src/app/services/firestore.service';

interface Country {
  iso: string;
  name: string;
  currencyName: string;
  currencySymbol: string;
}

@Component({
  selector: 'app-dialog-country-picker',
  templateUrl: './dialog-country-picker.component.html',
  styleUrls: ['./dialog-country-picker.component.sass']
})
export class DialogCountryPickerComponent implements OnInit {

  countries: Country[] = [
    {iso: 'fr', name: 'France', currencyName: 'EUR', currencySymbol: '€'},
    {iso: 'us', name: 'United States', currencyName: 'USD', currencySymbol: '$'},
    {iso: 'gb', name: 'United Kingdom', currencyName: 'GBP', currencySymbol: '£'},
    {iso: 'ch', name: 'Switzerland', currencyName: 'CHF', currencySymbol: ''},
  ];

  countryControl = new FormControl('')
  user: Observable<any>

  constructor(
    public dialogRef: MatDialogRef<DialogCountryPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Observable<any>,
    private fs: FirestoreService,
  ) {
    this.user = data
    this.data.subscribe(user => {
      let ch: Country = this.countries.find(country => country.iso == user.country.iso)
      this.countryControl.setValue(ch)
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  apply() {
    this.fs.update$(this.fs.userDocRef(), {country: this.countryControl.value})
      .then(() => this.dialogRef.close())
  }
}
