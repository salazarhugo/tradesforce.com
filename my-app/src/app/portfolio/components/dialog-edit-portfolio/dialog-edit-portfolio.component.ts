import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Portfolio} from "../../../core/models/portfolio.model";
import {PortfolioService} from "../../services/portfolio.service";

@Component({
  selector: 'app-dialog-edit-portfolio',
  templateUrl: './dialog-edit-portfolio.component.html',
  styleUrls: ['./dialog-edit-portfolio.component.sass']
})
export class DialogEditPortfolioComponent implements OnInit {

  portfolio: Portfolio

  constructor(
    public dialogRef: MatDialogRef<DialogEditPortfolioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Portfolio,
    private portfolioService: PortfolioService
  ) {
    this.portfolio = data
  }

  ngOnInit(): void {
  }

  save(portfolio: Portfolio) {
    this.portfolioService.editPortfolio(portfolio).then(r => this.dialogRef.close(r))
  }
}
