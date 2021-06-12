import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogAddStockComponent} from '../dialog-add-stock/dialog-add-stock.component';
import {NotificationService} from 'src/app/services/notification/notification.service';
import {ModelService} from 'src/app/model/services/model.service';

@Component({
  selector: 'app-dialog-delete-model',
  templateUrl: './dialog-delete-model.component.html',
  styleUrls: ['./dialog-delete-model.component.sass']
})
export class DialogDeleteModelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogAddStockComponent>,
    @Inject(MAT_DIALOG_DATA) public modelId: string,
    public modelService: ModelService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
  }

  deleteModel() {
    this.modelService.deleteModel(this.modelId).then(res => {
      this.dialogRef.close()
      this.notificationService.success("Deleted model")
    })
  }
}
