import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {DialogAddStockComponent} from '../dialog-add-stock/dialog-add-stock.component';
import {ModelService} from 'src/app/model/services/model.service';
import {Model} from 'src/app/core/models/model.model';

@Component({
  selector: 'app-dialog-add-model',
  templateUrl: './dialog-add-model.component.html',
  styleUrls: ['./dialog-add-model.component.sass']
})
export class DialogAddModelComponent implements OnInit {

  model = new Model()

  constructor(
    public dialogRef: MatDialogRef<DialogAddStockComponent>,
    private modelService: ModelService
  ) {
  }

  ngOnInit(): void {
  }

  addModel() {
    this.modelService.addModel(this.model)
    this.dialogRef.close()
  }
}
