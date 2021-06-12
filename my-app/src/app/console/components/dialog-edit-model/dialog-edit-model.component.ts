import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Model} from "../../../core/models/model.model";
import {ModelService} from "../../../model/services/model.service";

@Component({
  selector: 'app-dialog-edit-model',
  templateUrl: './dialog-edit-model.component.html',
  styleUrls: ['./dialog-edit-model.component.sass']
})
export class DialogEditModelComponent implements OnInit {

  model: Model

  constructor(
    public dialogRef: MatDialogRef<DialogEditModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Model,
    private modelService: ModelService,
  ) {
    this.model = data
  }

  ngOnInit(): void {
  }

  save(model: Model) {
    this.modelService.updateModel(this.model.id, model).then(r => this.dialogRef.close(r))
  }
}
