import {Component, OnInit} from '@angular/core'
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'
import {DialogAddStockComponent} from 'src/app/shared/components/dialog-add-stock/dialog-add-stock.component'
import {Portfolio} from 'src/app/core/models/portfolio.model'
import {PortfolioService} from '../../services/portfolio.service'
import {Observable} from "rxjs/internal/Observable";
import {CurrencySelectorComponent} from "../../../shared/components/currency-selector/currency-selector.component";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.sass'],
})
export class PortfolioComponent implements OnInit {
  portfolio: Portfolio
  columns: any[]

  constructor(
    public dialog: MatDialog,
    private portfolioService: PortfolioService,
    private route: ActivatedRoute,
    private titleService: Title,
  ) {
  }

  stocks = new Observable<any>()
  subs = []

  ngOnDestroy() {
    this.subs.forEach(subsription => subsription.unsubscribe())
  }

  ngOnInit(): void {
    let a = this.route.data.subscribe((data: { portfolio: Portfolio }) => {
      this.portfolioService.setPortfolio(data.portfolio)
      this.portfolio = data.portfolio
      this.titleService.setTitle(data.portfolio.name + " - Stock Portfolio & Tracker - Lars");
      this.stocks = this.portfolioService.stocks$
    })
    this.subs.push(a)
  }

  openEditCurrencyDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'dialog-300-border-radius-12'
    dialogConfig.data = this.portfolioService.listenPortfolio(this.portfolio.id)

    const dialogRef = this.dialog.open(CurrencySelectorComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    })
  }

  openAddStockDialog() {
    const dialogRef = this.dialog.open(DialogAddStockComponent, {
      panelClass: 'myapp-border-radius-12-dialog',
      data: this.portfolio.id,
      width: '400px',
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    })
  }
}
