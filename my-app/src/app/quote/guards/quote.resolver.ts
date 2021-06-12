import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {EMPTY, Observable, of} from 'rxjs';
import {Portfolio} from '../../core/models/portfolio.model';
import {mergeMap, take} from "rxjs/operators";
import {IexApiService} from "../../core/http/iexcloud/iex-api.service";

@Injectable()
export class QuoteResolver implements Resolve<Portfolio> {

  constructor(
    private router: Router,
    private iexService: IexApiService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Observable<never> {

    // If portfolio is passed by args
    if (this.router.getCurrentNavigation().extras.state != null) {
      return this.router.getCurrentNavigation().extras.state as Observable<any>
    }

    return this.iexService.quote(route.params.symbol).pipe(
      take(1),
      mergeMap(quote => {
        if (quote) {
          return of(quote)
        } else {
          this.router.navigate(['./dashboard']);
          return EMPTY
        }
      }))
  }
}
