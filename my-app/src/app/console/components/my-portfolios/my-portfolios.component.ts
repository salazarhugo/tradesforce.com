import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatDialog} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {DialogDeletePortfolioComponent} from 'src/app/shared/components/dialog-delete-portfolio/dialog-delete-portfolio.component';
import {AddPortfolioComponent} from 'src/app/shared/components/add-portfolio/add-portfolio.component';
import {PortfolioService} from '../../../portfolio/services/portfolio.service';
import {Portfolio} from 'src/app/core/models/portfolio.model';
import {Router} from '@angular/router';
import {DialogEditPortfolioComponent} from "../../../portfolio/components/dialog-edit-portfolio/dialog-edit-portfolio.component";
import {Title} from "@angular/platform-browser";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";
import {NotificationService} from "../../../services/notification/notification.service";

@Component({
  selector: 'app-my-portfolios',
  templateUrl: './my-portfolios.component.html',
  styleUrls: ['./my-portfolios.component.sass']
})
export class MyPortfoliosComponent implements OnInit {
  total: number
  displayColumns = ['name', 'stockCount', 'currency', 'status', 'controls']
  dataSource: MatTableDataSource<any>

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public portfolioService: PortfolioService,
    public firestore: AngularFirestore,
    private dialog: MatDialog,
    private router: Router,
    private titleService: Title,
    private _snackBar: MatSnackBar,
    private notification: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.dataSource = null
    this.loadPortfolios()
    this.titleService.setTitle("Stock Portfolio & Tracker - Lars");
  }

  portfoliosSub: Subscription

  ngOnDestroy() {
    this.portfoliosSub.unsubscribe()
  }

  loadPortfolios() {
    this.portfoliosSub = this.portfolioService.listenPortfolios().subscribe(data => {
      this.total = data.length
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'currency':
            return item.currency.name;
          default:
            return item[property];
        }
      }
      this.dataSource.sort = this.sort
    })
  }

  openDeleteDialog(portfolioId: string) {
    this.dialog.open(DialogDeletePortfolioComponent, {
      panelClass: 'dialog-300-border-radius-12'
    }).afterClosed().subscribe((clickedDelete: boolean) => {
      if (clickedDelete)
        this.deletePortfolio(portfolioId)
    })
  }

  deletePortfolio(portfolioId: string) {
    this.portfolioService.deletePortfolio(portfolioId)
      .then(() => this.notification.success("Deleted portfolio"))
      .catch(err => this.notification.error(err))
  }

  openAddDialog(): void {
    let dialogRef = this.dialog.open(AddPortfolioComponent, {
      panelClass: 'dialog-border-radius-12'
    })
    dialogRef.afterClosed().subscribe(res => {
      if (!res) return
      if (res.id)
        this._snackBar.open(`${res.name} - Portfolio created`, null, {
          duration: 2000
        })
      else
        this._snackBar.open(`An error occured: ${res}`, "OK", {
          duration: 6000
        })
    })
  }

  openEditDialog(portfolio: Portfolio): void {
    this.dialog.open(DialogEditPortfolioComponent, {
      panelClass: 'dialog-border-radius-12',
      data: portfolio
    })
  }

  navigateToPortfolio(portfolio: Portfolio): void {
    // this.portfolioService.setPortfolio(portfolio)
    this.router.navigate(["console/p/" + portfolio.id], {state: portfolio})
      .then(r => console.log(r));
  }
}
