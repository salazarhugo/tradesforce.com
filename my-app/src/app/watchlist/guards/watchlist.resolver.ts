import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {EMPTY, Observable, of} from 'rxjs';
import {WatchlistService} from "../services/watchlist.service";
import {Watchlist} from "../models/watchlist.model";
import {mergeMap, take} from "rxjs/operators";

@Injectable()
export class WatchlistResolver implements Resolve<any> {

  constructor(
    private router: Router,
    private watchlistService: WatchlistService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Watchlist> | Observable<never> {
    if (this.router.getCurrentNavigation().extras.state != null) {
      return this.router.getCurrentNavigation().extras.state as Observable<Watchlist>
    }

    return this.watchlistService.watchlist$(route.params.id).pipe(
      take(1),
      mergeMap(watchlist => {
        if (watchlist) {
          return of(watchlist)
        } else {
          this.router.navigate(['./dashboard']);
          return EMPTY
        }
      }))
  }
}
