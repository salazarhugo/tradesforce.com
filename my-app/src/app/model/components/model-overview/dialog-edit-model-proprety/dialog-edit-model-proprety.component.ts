import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Proprety} from 'src/app/core/models/proprety.model';
import {ModelService} from '../../../services/model.service';

@Component({
  selector: 'app-dialog-edit-model-proprety',
  templateUrl: './dialog-edit-model-proprety.component.html',
  styleUrls: ['./dialog-edit-model-proprety.component.sass']
})
export class DialogEditModelPropretyComponent implements OnInit {

  types = ['number', 'boolean']
  proprety: Proprety

  constructor(
    public dialogRef: MatDialogRef<DialogEditModelPropretyComponent>,
    @Inject(MAT_DIALOG_DATA) public propretyArg: Proprety,
    private modelService: ModelService
  ) {
    this.proprety = propretyArg
  }

  ngOnInit(): void {
  }

}
