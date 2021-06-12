import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogAddStockComponent} from '../dialog-add-stock/dialog-add-stock.component';
import {ModelService} from 'src/app/model/services/model.service';
import {Proprety} from 'src/app/core/models/proprety.model';

@Component({
  selector: 'app-dialog-add-model-proprety',
  templateUrl: './dialog-add-model-proprety.component.html',
  styleUrls: ['./dialog-add-model-proprety.component.sass']
})
export class DialogAddModelPropretyComponent implements OnInit {

  types = ['number', 'boolean']

  proprety = new Proprety()

  constructor(
    public dialogRef: MatDialogRef<DialogAddStockComponent>,
    @Inject(MAT_DIALOG_DATA) public modelId: string, private modelService: ModelService) {
  }

  ngOnInit(): void {
  }

  addProprety() {
    this.modelService.addModelProprety(this.modelId, this.proprety)
    this.dialogRef.close()
  }
}
