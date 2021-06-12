import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Stock} from "../../../core/models/stock.model";
import {rowsAnimation} from "../../../animations/rows.animation";
import {PortfolioService} from "../../services/portfolio.service";
import {DialogEditStockComponent} from "../../../shared/components/dialog-edit-stock/dialog-edit-stock.component";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs/internal/Observable";
import {FirebaseUserModel} from "../../../core/models/user.model";
import {Column} from "../../../shared/components/colomns-checkbox/columns-checkbox.component";
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'portfolio-table',
  templateUrl: './portfolio-table.component.html',
  styleUrls: ['./portfolio-table.component.sass'],
  animations: [rowsAnimation]
})
export class PortfolioTableComponent implements OnInit {

  @Input() user: Observable<FirebaseUserModel>
  @Input() dataSource: MatTableDataSource<Stock>
  columns: Column[] = [
    {name: 'logo', displayName: 'Logo', show: true},
    {name: 'companyName', displayName: 'Name', show: true},
    {name: 'symbol', displayName: 'Symbol', show: true},
    {name: 'currency', displayName: 'Currency', show: true},
    {name: 'quantity', displayName: 'Shares', show: true},
    {name: 'marketValue', displayName: 'Market value', show: true},
    {name: 'primaryExchange', displayName: 'Exchange', show: false},
    {name: 'region', displayName: 'Region', show: true},
    {name: 'averagePrice', displayName: 'Average price', show: true},
    {name: 'price', displayName: 'Price', show: true},
    {name: 'change', displayName: 'Change', show: true},
    {name: 'changePercent', displayName: 'Change %', show: true},
    {name: 'tags', displayName: 'Tags', show: true},
    {name: 'controls', displayName: 'Controls', show: true},
  ]
  @Output() columnsChange = new EventEmitter<any[]>();
  displayColumns: string[] = this.columns.filter(t => t.show).map(t => t.name);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public portfolioService: PortfolioService,
    public dialog: MatDialog,
    public breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.columnsChange.emit(this.columns)
  }

  updateColumns() {
    this.displayColumns = this.columns.filter(t => t.show).map(t => t.name);
  }

  ngOnChanges() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.breakpointObserver
      .observe(['(min-width: 960px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) { //Viewport is 960px or over!
        } else {
          // console.log(this.columns)
          // this.columns[0].show = false
          // this.displayColumns = this.columns.filter(t => t.show == true).map(t => t.name);
        }
      })
  }

  /** Delete stock from current portfolio */
  deleteStock(stock) {
    this.portfolioService.deleteStock(stock)
  }

  openEditStockDialog(row) {
    const dialogRef = this.dialog.open(DialogEditStockComponent, {
      panelClass: 'app-dreg-dialog-panel',
      data: row
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    })
  }

  navigateToQuote(row) {
    this.router.navigate(['console/q', row.symbol])
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
