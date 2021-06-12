import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {EMPTY, Observable, of} from 'rxjs';
import {Trade} from "../../core/models/trade";
import {FirestoreService} from "../../services/firestore.service";
import {mergeMap, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TradeResolver implements Resolve<Trade> {

  constructor(
    private router: Router,
    private firestoreService: FirestoreService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Trade> | Observable<never> {

    // If trade is passed by args
    if (this.router.getCurrentNavigation().extras.state != null) {
      const trade = this.router.getCurrentNavigation().extras.state as Trade
      return of(trade)
    }

    // this.tradeId = this.route.snapshot.paramMap.get('id');
    // this.firestoreService.getTrade(this.tradeId).subscribe(data => {
    //   this.trade = data
    //   this.trade.entrydate = (this.trade.entrydate as any).toDate()
    //   this.trade.exitdate = (this.trade.exitdate as any).toDate()
    // })

    return this.firestoreService.getTrade(route.params.id).pipe(
      take(1),
      mergeMap(trade => {
        console.log("TRADE RESOLVER")
        console.log(trade)
        if (trade) {
          return of(trade)
        } else {
          this.router.navigate(['./dashboard']);
          return EMPTY
        }
      }))
  }
}
