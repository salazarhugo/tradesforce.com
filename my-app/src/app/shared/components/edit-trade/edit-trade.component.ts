import {Component, Inject, OnInit} from '@angular/core';
import {FirestoreService} from 'src/app/services/firestore.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from 'src/app/services/notification/notification.service';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Tag} from 'src/app/core/models/tag.model';
import {ModelService} from 'src/app/model/services/model.service';
import {Observable} from "rxjs/internal/Observable";
import {Model} from "../../../core/models/model.model";
import {Trade} from "../../../core/models/trade";

@Component({
  selector: 'app-edit-trade',
  templateUrl: './edit-trade.component.html',
  styleUrls: ['./edit-trade.component.sass']
})
export class EditTradeComponent implements OnInit {

  selected: boolean
  timeframes = ["M15", "H1", "H4", "D1"]
  models$: Observable<Model[]>
  trade: Trade
  selectedModelId: string
  selectedModelPropreties: Array<any>
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    public modelService: ModelService,
    public dialogRef: MatDialogRef<EditTradeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public notificationService: NotificationService,
    public firestoreService: FirestoreService
  ) {
  }

  ngOnInit(): void {
    this.models$ = this.data.models$
    this.trade = this.data.trade
  }

  getModelPropreties(model) {
    console.log(model)
    this.modelService.listenModelPropreties(model.id).subscribe(data => {
      console.log(data)
      this.selectedModelPropreties = data
      this.trade.propreties = data
    })
  }

  save() {
    this.firestoreService.updateTrade(this.trade)
      .then(res => this.notificationService.success("Updated trade details"), error => this.notificationService.error(error))
    this.dialogRef.close()
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (this.trade.tags == null)
      this.trade.tags = []
    // Add our fruit
    if ((value || '').trim()) {
      this.trade.tags.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tag): void {
    const index = this.data.trade.tags.indexOf(tag);

    if (index >= 0) {
      this.data.trade.tags.splice(index, 1);
    }
  }
}
