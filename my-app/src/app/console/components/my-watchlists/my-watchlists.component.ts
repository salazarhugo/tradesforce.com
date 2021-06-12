import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {DialogDeletePortfolioComponent} from "../../../shared/components/dialog-delete-portfolio/dialog-delete-portfolio.component";
import {AddPortfolioComponent} from "../../../shared/components/add-portfolio/add-portfolio.component";
import {Portfolio} from "../../../core/models/portfolio.model";
import {DialogEditPortfolioComponent} from "../../../portfolio/components/dialog-edit-portfolio/dialog-edit-portfolio.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {WatchlistService} from "../../../watchlist/services/watchlist.service";
import {MatSort} from "@angular/material/sort";
import {AngularFireAuth} from "@angular/fire/auth";
import {Watchlist} from "../../../watchlist/models/watchlist.model";

@Component({
  selector: 'app-my-watchlists',
  templateUrl: './my-watchlists.component.html',
  styleUrls: ['./my-watchlists.component.sass']
})
export class MyWatchlistsComponent implements OnInit {

  dataSource: MatTableDataSource<any>
  displayColumns = ['name', 'stockCount', 'controls']
  portfoliosSub: Subscription
  total: number

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public watchlistService: WatchlistService,
    public firestore: AngularFirestore,
    private dialog: MatDialog,
    private router: Router,
    private titleService: Title,
    private _snackBar: MatSnackBar,
    private auth: AngularFireAuth
  ) {
  }

  ngOnDestroy() {

  }

  ngOnInit(): void {
    this.loadWatchlists()
    // this.auth.user.subscribe(user => {
    //   this.watchlistService.addWatchlist(new Watchlist(user.uid, "My first Wathclist"))
    // })
  }

  loadWatchlists() {
    this.portfoliosSub = this.watchlistService.watchlists$().subscribe(data => {
      this.total = data.length
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort = this.sort
    })
  }

  openDeleteDialog(watchlistId: string) {
    this.dialog.open(DialogDeletePortfolioComponent, {
      panelClass: 'myapp-border-radius-12-dialog',
    }).afterClosed().subscribe((clickedDelete: boolean) => {
      if(clickedDelete)
        this.deleteWatchlist(watchlistId)
    })
  }

  deleteWatchlist(watchlistId: string) {
    this.watchlistService.deleteWatchlist(watchlistId).then(res => {
    }).catch(err => {
      console.log(err)
    })
  }

  openAddDialog(): void {
    let dialogRef = this.dialog.open(AddPortfolioComponent, {
      panelClass: 'myapp-border-radius-12-dialog'
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
      panelClass: 'myapp-border-radius-12-dialog',
      data: portfolio
    })
  }

  navigateToWatchlist(watchlist: Watchlist): void {
    this.router.navigate(["console/w/" + watchlist.id], {state: watchlist});
  }
}
