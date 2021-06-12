import {Injectable} from '@angular/core';
import {FirestoreService} from "../../services/firestore.service";
import {AngularFireFunctions} from "@angular/fire/functions";
import {Observable} from "rxjs/internal/Observable";
import {Watchlist} from "../models/watchlist.model";
import {AngularFireAuth} from "@angular/fire/auth";
import {switchMap} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {


  constructor(
    public afs: AngularFirestore,
    public fs: FirestoreService,
    private fns: AngularFireFunctions,
    private auth: AngularFireAuth
  ) {
  }

  private WATCHLISTS_REF = this.afs.collection<Watchlist>("watchlists")

  watchlists$(): Observable<Watchlist[]> {
    return this.auth.user.pipe(switchMap(user => {
      return this.fs.col$<Watchlist>(this.WATCHLISTS_REF, ref => ref.where('uid', '==', user.uid))
    }))
  }

  watchlist$(watchlistId: string): Observable<Watchlist> {
    return this.auth.user.pipe(switchMap(user => {
      return this.fs.doc$<Watchlist>(`${this.WATCHLISTS_REF}/${user.uid}`)
    }))
  }

  addWatchlist(watchlist: Watchlist): Promise<Watchlist> {
    return this.fs.addWithId$(this.WATCHLISTS_REF, watchlist)
  }

  deleteWatchlist(watchlistId: string): Promise<void> {
    return this.fs.delete$(this.WATCHLISTS_REF.doc(watchlistId))
  }

}
