import {Component, OnInit} from '@angular/core';
import {SidenavService} from "../../../services/sidenav.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {AuthService} from "../../../core/authentication/auth.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DialogCountryPickerComponent} from "../../../shared/components/dialog-country-picker/dialog-country-picker.component";
import {NotificationService} from "../../../services/notification/notification.service";
import {FirestoreService} from "../../../services/firestore.service";
import {Observable} from "rxjs";
import {Portfolio} from "../../../core/models/portfolio.model";
import {PortfolioService} from "../../../portfolio/services/portfolio.service";
import {filter} from "rxjs/operators";
import {sidenavAnimation} from "../../../animations/rows.animation";
import {Model} from "../../../core/models/model.model";
import {ModelService} from "../../../model/services/model.service";

@Component({
  selector: 'lars-mat-nav-list',
  templateUrl: './lars-mat-nav-list.component.html',
  styleUrls: ['./lars-mat-nav-list.component.sass'],
  animations: [sidenavAnimation]
})
export class LarsMatNavListComponent implements OnInit {

  selected: string
  isModel: boolean
  user: Observable<any>
  portfolio$: Observable<Portfolio>
  model$: Observable<Model>
  currentRoute: string;

  constructor(
    public authService: AuthService,
    public auth: AngularFireAuth,
    public router: Router,
    public sidenavService: SidenavService,
    public notificationService: NotificationService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public fs: FirestoreService,
    public portfolioService: PortfolioService,
    public modelService: ModelService,
  ) {
    this.user = fs.doc$(fs.userDocRef())
    this.portfolio$ = portfolioService.portfolio$
    this.model$ = modelService.model$

    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      console.log(e)
      if (e.url.includes("p/"))
        this.currentRoute = "portfolio"
      else if (e.url.includes("m/"))
        this.currentRoute = "model"
      else if (e.url.includes("w/"))
        this.currentRoute = "watchlist"
      else
        this.currentRoute = e.urlAfterRedirects
    });
  }

  ngOnInit(): void {
    this.sidenavService.isModel.subscribe(data => this.isModel = data)
  }

  openCountryPickerDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'dialog-400-border-radius-12'
    dialogConfig.data = this.user

    const dialogRef = this.dialog.open(DialogCountryPickerComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  navigateToMyPortfolios() {
    this.router.navigate(['portfolios'], {relativeTo: this.route});
  }

  navigateToMyModels() {
    this.router.navigate(['models'], {relativeTo: this.route});
  }

  navigateToPortfolioOverview() {
    this.portfolio$.subscribe(res => {
      this.router.navigate(['p/' + res.id + '/overview'], {relativeTo: this.route});
    })
  }

  navigateToPortfolioDiversification() {
    this.portfolio$.subscribe(res => {
      this.router.navigate(['p/' + res.id + '/diversification'], {relativeTo: this.route});
    })
  }

  tryLogout() {
    this.authService.logout().then(res => {
      this.router.navigate(['../']);
    })
  }

  navigateToModelRules() {
    this.model$.subscribe(res => {
      this.router.navigate(['m/' + res.id + '/rules'], {relativeTo: this.route});
    })
  }
}
