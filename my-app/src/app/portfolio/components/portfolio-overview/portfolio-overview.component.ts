import {Component, OnInit} from '@angular/core';
import {PortfolioService} from "../../services/portfolio.service";
import {MatTableDataSource} from "@angular/material/table";
import {Stock} from "../../../core/models/stock.model";
import {Observable} from "rxjs/internal/Observable";
import {FirestoreService} from "../../../services/firestore.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-portfolio-overview',
  templateUrl: './portfolio-overview.component.html',
  styleUrls: ['./portfolio-overview.component.sass']
})
export class PortfolioOverviewComponent implements OnInit {

  dataSource: MatTableDataSource<Stock>
  user: Observable<any>
  columns: any[]
  subs: Subscription[] = []

  constructor(
    private portfolioService: PortfolioService,
    public firestoreService: FirestoreService,
  ) {
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }

  ngOnInit(): void {
    this.user = this.firestoreService.docUser$()

    let s1 = this.portfolioService.stocks$.subscribe(data => {
      this.dataSource = new MatTableDataSource<Stock>(data)
    })
    this.subs.push(s1)
  }

}
