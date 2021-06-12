import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {EMPTY, Observable, of} from 'rxjs';
import {Portfolio} from '../../core/models/portfolio.model';
import {PortfolioService} from '../services/portfolio.service';
import {mergeMap, take} from "rxjs/operators";

@Injectable()
export class PortfolioResolver implements Resolve<Portfolio> {

  constructor(
    private router: Router,
    private portfolioService: PortfolioService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Portfolio> | Observable<never> {

    //If portfolio is passed by args
    if (this.router.getCurrentNavigation().extras.state != null) {
      const portfolio = this.router.getCurrentNavigation().extras.state as Portfolio
      this.portfolioService.fetchStocks(portfolio.id)
      return of(portfolio)
    }

    return this.portfolioService.listenPortfolio(route.params.id).pipe(
      take(1),
      mergeMap(portfolio => {
        if (portfolio) {
          this.portfolioService.fetchStocks(portfolio.id)
          return of(portfolio)
        } else {
          this.router.navigate(['./dashboard']);
          return EMPTY
        }
      }))
  }
}
