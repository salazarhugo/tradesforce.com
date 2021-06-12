import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table'
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {Trade} from 'src/app/core/models/trade';
import {DynamicScriptLoaderService} from 'src/app/services/dynamic-script-loader-service.service';
import {FirestoreService} from 'src/app/services/firestore.service';
import {EditTradeComponent} from 'src/app/shared/components/edit-trade/edit-trade.component';
import {Title} from "@angular/platform-browser";
import {NotificationService} from "../../../services/notification/notification.service";
import {Observable} from "rxjs/internal/Observable";
import {Model} from "../../../core/models/model.model";
import {ModelService} from "../../../model/services/model.service";

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.sass']
})
export class TradeComponent implements OnInit {
  isChartDataAvailable: boolean = false
  displayColumns = [
    'name',
    'symbol',
    // 'average-price',
    //  'quantity',
    'latestPrice',
    'market-value',
    'tags',
    'controls'
  ]
  dataSource: MatTableDataSource<any>
  data = [
    ['Mon', 20, 28, 38, 45],
    ['Tue', 31, 38, 55, 66],
    ['Wed', 50, 55, 77, 80],
    ['Thu', 77, 77, 66, 50],
    ['Fri', 68, 66, 22, 15]
    // Treat first row as data as well.
  ]
  slides = [{image: "https://lh3.googleusercontent.com/a-/AOh14GjdjRd0GAcGAak2O4_YyQX8FZTKIh5k_unszPjbkQ=s96-c"}]
  options: {
    legend: "none"
  }

  trade: Trade
  tradeId: string
  fileToUpload: File

  constructor(
    public firestoreService: FirestoreService,
    private route: ActivatedRoute,
    public scriptLoader: DynamicScriptLoaderService,
    public dialog: MatDialog,
    public titleService: Title,
    public notif: NotificationService,
    public modelService: ModelService,
  ) {
  }

  models$: Observable<Model[]>

  ngOnInit(): void {
    this.route.data.subscribe((data: { trade: Trade }) => {
      this.trade = data.trade
      this.titleService.setTitle(data.trade.symbol + " - Trade Details - Lars");
    })
    this.models$ = this.modelService.getModels$()
  }

  openEditTradeDialog() {
    this.dialog.open(EditTradeComponent, {
      panelClass: 'dialog-border-radius-12',
      data: {
        trade: this.trade,
        models$: this.models$
      }
    })
  }

  moveTrade(trade: Trade, modelId: string) {
    this.firestoreService.database.trades.doc(trade.id)
      .update({
        modelId: modelId
      }).then(() => {
      this.notif.success("Successfully moved trade #" + trade.id)
    }).catch(err => this.notif.error(err + ' #' + trade.id))
  }

  uploadFile(files: FileList) {
    this.fileToUpload = files.item(0)
    this.firestoreService.uploadTradeImage(this.fileToUpload, this.tradeId)
  }

  renderTable__date(date) {
    if (date == undefined || date == "" || date == null) return "";
    let pipe = new DatePipe('en')
    return pipe.transform(date.toDate().getTime(), 'medium');
  }

}
