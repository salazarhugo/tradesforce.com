import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";
import {DriveService} from "../../services/drive.service";
import {Folder} from "../../../core/models/folder.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dialog-add-folder',
  templateUrl: './dialog-add-folder.component.html',
  styleUrls: ['./dialog-add-folder.component.sass']
})
export class DialogAddFolderComponent implements OnInit {

  nameControl = new FormControl("", [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(64)
  ]);

  constructor(
    private dialogRef: MatDialogRef<DialogAddFolderComponent>,
    @Inject(MAT_DIALOG_DATA) private currentFolder: Observable<Folder>,
    private driveService: DriveService
  ) {
  }

  ngOnInit(): void {
  }

  save() {
    if(!this.nameControl.valid)
      this.dialogRef.close()

    this.currentFolder.subscribe(currentFolder => {
      this.driveService.createFolder(this.nameControl.value, currentFolder)
      this.dialogRef.close()
    }).unsubscribe()
  }
}
