import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {AngularFirestore} from '@angular/fire/firestore';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {FirestoreService} from 'src/app/services/firestore.service';
import {SidenavService} from 'src/app/services/sidenav.service';
import {DialogAddModelComponent} from 'src/app/shared/components/dialog-add-model/dialog-add-model.component';
import {DialogDeleteModelComponent} from 'src/app/shared/components/dialog-delete-model/dialog-delete-model.component';
import {ModelService} from '../../../model/services/model.service';
import {DialogEditModelComponent} from "../dialog-edit-model/dialog-edit-model.component";
import {Model} from "../../../core/models/model.model";

@Component({
  selector: 'app-my-models',
  templateUrl: './my-models.component.html',
  styleUrls: ['./my-models.component.sass']
})
export class MyModelsComponent implements OnInit {

  totalModels: number
  displayColumns = ['name', 'financial-market', 'status', 'controls']
  dataSource: MatTableDataSource<any>

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public firestore: AngularFirestore,
    private firestoreService: FirestoreService,
    private dialog: MatDialog,
    private router: Router,
    private modelService: ModelService,
    private sidenavService: SidenavService
  ) {
  }

  ngOnInit(): void {
    this.loadModels()
  }

  loadModels() {
    this.modelService.listenModels().subscribe(data => {
      this.totalModels = data.length
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.sort = this.sort
    })
  }

  goToModelDetails(model) {
    this.modelService.setModel(model)
    this.router.navigate(['console/m', model.id], {state: model})
    this.sidenavService.setModel(true)
  }

  openDeleteDialog(modelId: string) {
    this.dialog.open(DialogDeleteModelComponent, {
      panelClass: 'dialog-300-border-radius-12',
      data: modelId
    })
  }

  openAddDialog() {
    this.dialog.open(DialogAddModelComponent, {
      panelClass: 'dialog-border-radius-12',
    })
  }

  openEditModelDialog(model: Model) {
    this.dialog.open(DialogEditModelComponent, {
      panelClass: 'dialog-300-border-radius-12',
      data: model
    })
  }
}
