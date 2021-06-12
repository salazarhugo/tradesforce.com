import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogAddFolderComponent} from "../dialog-add-folder/dialog-add-folder.component";
import {DriveService} from "../../services/drive.service";
import {FirestoreService} from "../../../services/firestore.service";
import {Observable} from "rxjs/internal/Observable";
import {Folder, ROOT_FOLDER} from "../../../core/models/folder.model";
import {BehaviorSubject} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {File} from "../../../core/models/file.model";
import {UserService} from "../../../services/user.service";
import {MatMenuTrigger} from "@angular/material/menu";
import {DialogRenameComponent} from "../dialog-rename/dialog-rename.component";
import {NotificationService} from "../../../services/notification/notification.service";

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.sass']
})
export class DriveComponent implements OnInit {

  childFolders$: Observable<Folder[]>
  files$: Observable<File[]>
  currentFolder$ = new BehaviorSubject(ROOT_FOLDER);
  path$: Observable<any[]>

  @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger: MatMenuTrigger;

  constructor(
    private dialog: MatDialog,
    private driveService: DriveService,
    private fs: FirestoreService,
    private userService: UserService,
    private notification: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.childFolders$ = this.currentFolder$.pipe(
      switchMap(currentFolder => {
        return this.driveService.getChildFolders(currentFolder)
      })
    )

    this.files$ = this.currentFolder$.pipe(
      switchMap(currentFolder => {
        return this.driveService.getFiles(currentFolder)
      })
    )

    this.path$ = this.currentFolder$.pipe(
      map(currentFolder => {
        let path: any[] = currentFolder == ROOT_FOLDER ? [] : [ROOT_FOLDER]
        if (currentFolder)
          path = [...path, ...currentFolder.path, currentFolder]
        return path
      })
    )
  }

  openAddFolderDialog() {
    this.dialog.open(DialogAddFolderComponent, {
      panelClass: 'myapp-border-radius-12-dialog',
      data: this.currentFolder$
    })
  }

  goIntoFolder(folderId: string) {
    if (!folderId)
      this.currentFolder$.next(ROOT_FOLDER)
    else
      this.driveService.getCurrentFolder(folderId).subscribe(a => {
        this.currentFolder$.next(a)
      })
  }

  uploadingFiles = []

  uploadFile(e: any) {
    const file = e.target.files[0]
    if (this.currentFolder$.value == null || file == null) return

    const id = this.fs.afs.createId()
    this.uploadingFiles.push({id: id, name: file.name, progress: 0, error: false})

    const currentFolder = this.currentFolder$.value

    const filePath = currentFolder == ROOT_FOLDER
      ? `${currentFolder.path.join('/')}/${file.name}`
      : `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}`

    this.driveService.uploadFile(this.userService.user$.value.uid, filePath, file)
      .snapshotChanges().subscribe((task) => {

      const progress = task.bytesTransferred / task.totalBytes // Between 0 and 1
      this.uploadingFiles.find(file => file.id == id).progress = progress

      if (progress == 1)
        this.uploadingFiles.filter(file => file.id != id)

      task.ref.getDownloadURL().then(url => {
        const newFile: File = {
          id: "",
          url: url,
          name: file.name,
          createdAt: this.fs.getCurrentTimestamp(),
          folderId: currentFolder.id,
          userId: this.userService.user$.value.uid
        }
        this.fs.addWithId$(this.fs.database.files.ref.path, newFile)
          .then(() => this.notification.success("Uploaded file"))
          .catch(err => this.notification.error(err))
      })
    })
  }

  menuTopLeftPosition = {x: "", y: ""}

  onRightClick(event: MouseEvent, folder) {
    // preventDefault avoids to show the visualization of the right-click menu of the browser
    event.preventDefault();

    // we record the mouse position in our object
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';

    // we open the menu
    // we pass to the menu the information about our object
    this.matMenuTrigger.menuData = {folder: folder}

    // we open the menu
    this.matMenuTrigger.openMenu();
  }

  onRightClickFile(event: MouseEvent, file) {
    // preventDefault avoids to show the visualization of the right-click menu of the browser
    event.preventDefault();

    // we record the mouse position in our object
    this.menuTopLeftPosition.x = event.clientX + 'px';
    this.menuTopLeftPosition.y = event.clientY + 'px';

    // we open the menu
    // we pass to the menu the information about our object
    this.matMenuTrigger.menuData = {file: file}

    // we open the menu
    this.matMenuTrigger.openMenu();
  }

  deleteFiles() {
    let batch = this.fs.afs.firestore.batch();

    this.files$.subscribe(files => {
      files.forEach(file => batch.delete(this.fs.database.files.doc(file.id).ref))
      batch.commit();
    })
  }

  deleteFolder(folder: Folder) {
    this.fs.database.folders.doc(folder.id).delete()
      .then(() => this.notification.success("Deleted folder"))
      .catch(err => this.notification.error(err))
  }

  renameFolder(folder: Folder) {
    this.dialog.open(DialogRenameComponent, {
      panelClass: 'myapp-border-radius-12-dialog',
      data: {isFolder: true, folder: folder}
    })
  }

  renameFile(file: File) {
    this.dialog.open(DialogRenameComponent, {
      panelClass: 'myapp-border-radius-12-dialog',
      data: {isFolder: false, file: file}
    })
  }

  goToFile(file: File) {
    window.open(file.url)
  }
}
