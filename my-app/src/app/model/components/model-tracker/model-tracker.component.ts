import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Model} from 'src/app/core/models/model.model';
import {FirestoreService} from 'src/app/services/firestore.service';
import {NotificationService} from 'src/app/services/notification/notification.service';
import {DialogAddModelPropretyComponent} from 'src/app/shared/components/dialog-add-model-proprety/dialog-add-model-proprety.component';
import {ModelService} from '../../services/model.service';
import {DialogEditModelPropretyComponent} from '../model-overview/dialog-edit-model-proprety/dialog-edit-model-proprety.component';

@Component({
  selector: 'app-model-tracker',
  templateUrl: './model-tracker.component.html',
  styleUrls: ['./model-tracker.component.sass']
})
export class ModelTrackerComponent implements OnInit {

  dataSource: MatTableDataSource<any>
  displayColumns = ['name', 'type', 'description', 'controls']
  model: Model

  constructor(public firestoreService: FirestoreService, private route: ActivatedRoute, private modelService: ModelService, private dialog: MatDialog, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.modelService.model$.subscribe(data =>
      this.model = data)
    this.modelService.listenModelPropreties(this.model.id).subscribe(data => {
      console.log(data)
      this.dataSource = data
    })
  }

  openAddProprety() {
    this.dialog.open(DialogAddModelPropretyComponent, {
      data: this.model.id
    })
  }

  editProprety(proprety) {
    this.dialog.open(DialogEditModelPropretyComponent, {
      data: proprety
    })
  }

  deleteProprety(propretyId) {
    this.modelService.deleteModelProprety(this.model.id, propretyId).then(res => this.notificationService.success("Deleted proprety"))
  }

}
