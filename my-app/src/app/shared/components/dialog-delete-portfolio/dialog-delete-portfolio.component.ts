import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogAddStockComponent} from '../dialog-add-stock/dialog-add-stock.component';
import {FirestoreService} from 'src/app/services/firestore.service';
import {NotificationService} from 'src/app/services/notification/notification.service';
import {PortfolioService} from 'src/app/portfolio/services/portfolio.service';

@Component({
  selector: 'app-dialog-delete-portfolio',
  templateUrl: './dialog-delete-portfolio.component.html',
  styleUrls: ['./dialog-delete-portfolio.component.sass']
})
export class DialogDeletePortfolioComponent implements OnInit {

  disabled: boolean
  delete: boolean = false

  constructor(
    public dialogRef: MatDialogRef<DialogAddStockComponent>,
    @Inject(MAT_DIALOG_DATA) public portfolioId: string,
    public firestoreService: FirestoreService,
    private notificationService: NotificationService,
    private portfolioService: PortfolioService,
  ) {
  }

  ngOnInit(): void {
  }

  deletePortfolio() {
    this.delete = true
    this.dialogRef.close(this.delete)
  }

  ngOnDestroy() {

  }
}
