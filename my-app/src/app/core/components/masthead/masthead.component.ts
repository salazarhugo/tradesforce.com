import {Component, HostListener, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import {AuthService} from 'src/app/core/authentication/auth.service';
import {Router} from '@angular/router';
import {SidenavService} from 'src/app/services/sidenav.service';
import {Observable} from 'rxjs';
import {ThemeService} from 'src/app/services/theme.service';
import {BreakpointObserver} from "@angular/cdk/layout";
import {IexApiService} from "../../http/iexcloud/iex-api.service";
import {StockExchangeStatus} from "../../models/stock-exchange-status.model";
import {FirebaseUserModel} from "../../models/user.model";
import {FirestoreService} from "../../../services/firestore.service";

@Component({
  selector: 'app-masthead',
  templateUrl: './masthead.component.html',
  styleUrls: ['./masthead.component.sass'],
})
export class MastheadComponent implements OnInit {
  public hideFloatingAccount: boolean = true;
  isDarkTheme: Observable<boolean>
  prevScrollpos = window.pageYOffset
  user$: Observable<FirebaseUserModel>

  constructor(
    public auth: AngularFireAuth,
    public authService: AuthService,
    private router: Router,
    public sidenavService: SidenavService,
    private themeService: ThemeService,
    private breakpointObserver: BreakpointObserver,
    private iexService: IexApiService,
    private fs: FirestoreService
  ) {
    this.user$ = this.fs.docUser$()
  }

  today: number = Math.round((new Date()).getTime() / 1000)
  marketStatus: Observable<StockExchangeStatus>

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.darkTheme$
    this.isDarkTheme.subscribe(res => console.log(res))
    // this.marketStatus = this.iexService.usMarketStatus()
    // this.marketStatus.subscribe(res => console.log(res.openTime))
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.updateTheme(checked)
  }

  toggleFloatingAccount() {
    this.hideFloatingAccount = !this.hideFloatingAccount;
  }

  tryLogout() {
    this.authService.logout().then(res => {
      this.router.navigate(['../']);
    })
  }

  toggleSideNav() {
    this.sidenavService.toggle()
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    this.prevScrollpos = window.pageYOffset
  }

}
