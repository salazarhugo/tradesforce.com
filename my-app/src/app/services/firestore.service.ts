import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore'
import {AngularFireAuth} from '@angular/fire/auth'
import {Observable} from 'rxjs';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {map} from 'rxjs/operators';
import {Trade} from '../core/models/trade';
import {FirebaseUserModel} from '../core/models/user.model';
import {UserService} from "./user.service";
import firebase from "firebase";
import FieldValue = firebase.firestore.FieldValue;
import DocumentData = firebase.firestore.DocumentData;

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    public afs: AngularFirestore,
    public auth: AngularFireAuth,
    public storage: AngularFireStorage,
    private userService: UserService
  ) {
  }

  public database = {
    users: this.afs.collection("users"),
    folders: this.afs.collection("folders"),
    files: this.afs.collection("files"),
    trades: this.afs.collection("trades"),
  }

  getCurrentTimestamp() {
    return FieldValue.serverTimestamp()
  }

  userDocRef(): DocPredicate<AngularFirestoreDocument> {
    return this.afs.collection('users').doc(this.userService.user$.value.uid)
  }

  col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
    return typeof ref === 'string' ? this.afs.collection<T>(ref, queryFn) : ref
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.afs.doc<T>(ref) : ref
  }

  col$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn).snapshotChanges().pipe(map(docs => {
      return docs.map(a => a.payload.doc.data()) as T[]
    }))
  }

  colWithIds$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<any[]> {
    return this.col(ref, queryFn).snapshotChanges().pipe(map(docs => {
      return docs.map(a => {
        const data = a.payload.doc.data()
        const id = a.payload.doc.id
        return {id, ...data}
      });
    }))
  }

  doc$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref).snapshotChanges().pipe(map(doc => {
      return doc.payload.data() as T
    }))
  }

  docWithId$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref).snapshotChanges().pipe(map(doc => {
      const data = doc.payload.data() as T
      const id = doc.payload.id
      return {id, ...data}
    }))
  }

  addWithId$<T>(ref: CollectionPredicate<T>, value: any): Promise<any> {
    const id = this.afs.createId();
    value.id = id
    return this.col(ref).doc(id).set({...value}).then(() => {
      return value
    })
  }

  update$<T>(ref: DocPredicate<T>, value: any) {
    return this.doc(ref).update({...value}).then(() =>
      console.log("Successfully udpated value: " + {value})
    )
  }

  delete$<T>(ref: DocPredicate<T>) {
    return this.doc(ref).delete().then(doc => {
      console.log("Successfully deleted value")
    })
  }

  docUser$(): Observable<any> {
    return this.doc$(this.userDocRef())
  }

  async addUserDocument(user: FirebaseUserModel) {
    const currentUser = await this.auth.currentUser
    return this.afs.collection("users").doc(currentUser.uid).set(Object.assign({}, user))
  }

  updateUser(value: any) {
    return this.database.users.doc(this.userService.user$.value.uid).update({...value}).then(() =>
      console.log("Successfully udpated value: " + {value})
    )
  }

  async getUserUid(): Promise<string> {
    const currentUser = await this.auth.currentUser
    return currentUser.uid
  }

  getUserDocument() {
    return this.afs.collection("users").doc(this.userService.user$.value.uid)
  }

  getTrade(tradeId): Observable<any> {
    return this.database.trades.doc(tradeId).valueChanges()
  }

  listenStocks(portfolioId): Observable<DocumentData[]> {
    return this.getUserDocument().collection("portfolios").doc(portfolioId)
      .collection("stocks", ref => ref.orderBy('symbol')).valueChanges()
  }

  listenPortfolios(): Observable<any> {
    return this.getUserDocument().collection('portfolios').valueChanges()
  }

  listenTrades(from: Date = new Date('1970/01/01'), to: Date = new Date()): Observable<any> {
    if (from == null)
      from = new Date('1970/01/01')
    if (to == null)
      to = new Date()

    return this.afs.collection("trades", ref => ref.orderBy('entrydate', "desc").where('entrydate', '>', from).where('entrydate', '<', to)).valueChanges()
  }

  listenStockTrades(limit = 9999): Observable<any> {
    return this.getUserDocument().collection("stockTrades", ref => ref.orderBy('entrydate', "desc").limit(limit)).valueChanges()
  }

  listenModelsTrades(limit = 9999): Observable<any> {
    return this.getUserDocument().collection("stockTrades", ref => ref.orderBy('entrydate', "desc").limit(limit)).valueChanges()
  }

  updateTrade(trade: Trade): Promise<void> {
    return this.afs.collection("trades").doc(trade.id).update(trade)
  }

  deleteTrade(tradeId: string): Promise<void> {
    return this.afs.collection("trades").doc(tradeId).delete()
  }

  deletePortfolio(portfolioId: string): Promise<void> {
    return this.getUserDocument().collection("portfolios").doc(portfolioId).delete()
  }

  deleteStockTrade(stockTradeId: string): Promise<void> {
    return this.getUserDocument().collection("stockTrades").doc(stockTradeId).delete()
  }

  downloadURL: string
  snapshot: Observable<any>
  task: AngularFireUploadTask

  uploadTradeImage(file: File, tradeId: string) {
    const path = `trades/${tradeId}/${Date.now()}_${file.name}`
    const ref = this.storage.storage.ref(path)

    ref.put(file).then(snapshot => {
      console.log("Uploaded a file!")
      snapshot.ref.getDownloadURL().then(url => {
        this.getUserDocument().collection('trades').doc(tradeId).update({images: FieldValue.arrayUnion(url)});
      })
    })
  }
}
