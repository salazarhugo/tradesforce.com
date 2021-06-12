import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatDialogRef} from '@angular/material/dialog';
import {Portfolio} from 'src/app/core/models/portfolio.model';
import {PortfolioService} from 'src/app/portfolio/services/portfolio.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {CurrencyIsoCode} from "../../../core/enums/currency.enum";
import {AppConstants} from "../../../core/constants/app.constant";

export function enumValidator(customEnum: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const allowed = Object.values(customEnum).includes(control.value)
    return allowed ? null : {forbiddenCurrency: {value: control.value}};
  };
}

@Component({
  selector: 'app-add-portfolio',
  templateUrl: './add-portfolio.component.html',
  styleUrls: ['./add-portfolio.component.sass']
})
export class AddPortfolioComponent implements OnInit {

  portfolioForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(96)
    ]),
    currency: new FormControl(CurrencyIsoCode.USD, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
      enumValidator(CurrencyIsoCode)
    ])
  });

  constructor(
    public dialogRef: MatDialogRef<AddPortfolioComponent>,
    public firestore: AngularFirestore,
    public auth: AngularFireAuth,
    private portfolioService: PortfolioService
  ) {
  }

  ngOnInit(): void {
  }

  createPortfolio(): void {
    this.auth.currentUser.then(user => {
      const portfolio = new Portfolio(user.uid, this.portfolioForm.value.name, AppConstants.CURRENCIES.find(c => c.iso_code == this.portfolioForm.value.currency))
      this.portfolioService.addPortfolio(portfolio).then(r => {
        this.dialogRef.close(r as Portfolio)
      }).catch(err => this.dialogRef.close(err))
    })
  }
}
