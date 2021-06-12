import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FirestoreService} from "../../../services/firestore.service";
import {Currency} from "../../../core/models/currency.model";
import {AppConstants} from "../../../core/constants/app.constant";
import {PortfolioService} from "../../../portfolio/services/portfolio.service";
import {Portfolio} from "../../../core/models/portfolio.model";

@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.sass']
})
export class CurrencySelectorComponent implements OnInit {

  currencies: Currency[] = AppConstants.CURRENCIES

  currencyControl = new FormControl(this.currencies[0])
  portfolioId: string

  constructor(
    public dialogRef: MatDialogRef<CurrencySelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Observable<Portfolio>,
    private fs: FirestoreService,
    private portfolioService: PortfolioService,
  ) {
    this.data.subscribe(portfolio => {
      this.portfolioId = portfolio.id
      let portfolioCurrency: Currency = this.currencies.find(currency => currency.iso_code == portfolio.currency.iso_code)
      this.currencyControl.setValue(portfolioCurrency)
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  apply() {
    this.portfolioService.updatePortfolio(this.portfolioId, {currency: this.currencyControl.value})
      .then(() => this.dialogRef.close())
  }
}
