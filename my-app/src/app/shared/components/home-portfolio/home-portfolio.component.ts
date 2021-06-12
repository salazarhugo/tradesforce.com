import {Component, OnInit, ViewChild} from '@angular/core'
import {AngularFirestore} from '@angular/fire/firestore'
import {AngularFireAuth} from '@angular/fire/auth'
import {MatDialog} from '@angular/material/dialog'
import {MatSort} from '@angular/material/sort'
import {FirestoreService} from 'src/app/services/firestore.service';
import {IndexService} from 'src/app/services/index.service'

@Component({
  selector: 'app-home-portfolio',
  templateUrl: './home-portfolio.component.html',
  styleUrls: ['./home-portfolio.component.sass']
})
export class HomePortfolioComponent implements OnInit {
  isChartDataAvailable: boolean = false
  displayColumns = ['name', 'symbol', 'quantity', 'latestPrice', 'market-value', 'tags']

  dataSource: any
  // dataSource = new MatTableDataSource(this.indexService.getMockData(() => ""));

  @ViewChild(MatSort, {static: true}) sort: MatSort

  constructor(
    public firestore: AngularFirestore,
    public auth: AngularFireAuth,
    public dialog: MatDialog,
    public firestoreService: FirestoreService,
    public indexService: IndexService
  ) {
  }

  ngOnInit(): void {
    // this.dataSource.sort = this.sort
  }

  renderTable__price(price) {
    if (price == undefined || price == "" || price == null) return 0;

    var x = Math.abs(price);
    var sign = Math.sign(price);

    if (x >= 1000000000)
      return (sign * x / 1000000000).toFixed(2) + 'B';
    if (x >= 1000000)
      return (sign * x / 1000000).toFixed(2) + 'M';
    if (x >= 1000)
      return (sign * x / 1000).toFixed(1) + 'K';
    return price.toFixed(2);
  }

  /**  */
  renderTable__percentChange(percentChange) {
    if (percentChange == undefined || percentChange == "" || percentChange == null) return 0;
    return percentChange.toFixed(2) + '%';
  }
}
