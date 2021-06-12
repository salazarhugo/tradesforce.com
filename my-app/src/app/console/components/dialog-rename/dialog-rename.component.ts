import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DriveService} from "../../services/drive.service";
import {NotificationService} from "../../../services/notification/notification.service";

@Component({
  selector: 'app-dialog-rename',
  templateUrl: './dialog-rename.component.html',
  styleUrls: ['./dialog-rename.component.sass']
})
export class DialogRenameComponent implements OnInit {

  nameControl = new FormControl("", [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(64)
  ]);

  constructor(
    private dialogRef: MatDialogRef<DialogRenameComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private driveService: DriveService,
    private notification: NotificationService
  ) {
    if (data.isFolder)
      this.nameControl.setValue(data.folder.name)
    else
      this.nameControl.setValue(data.file.name)
  }

  ngOnInit(): void {
  }

  save() {
    if (!this.nameControl.valid)
      this.dialogRef.close()

    if (this.data.isFolder)
      this.driveService.renameFolder(this.data.folder.id, this.nameControl.value)
        .then(() => {
          this.notification.success("Renamed folder")
          this.dialogRef.close()
        })
        .catch(err => this.notification.error(err))
    else
      this.driveService.renameFile(this.data.file.id, this.nameControl.value)
        .then(() => {
          this.notification.success("Renamed folder")
          this.dialogRef.close()
        })
        .catch(err => this.notification.error(err))
  }
}
