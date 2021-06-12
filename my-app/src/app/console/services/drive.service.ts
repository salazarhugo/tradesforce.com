import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {FirestoreService} from "../../services/firestore.service";
import {Folder, ROOT_FOLDER} from "../../core/models/folder.model";
import {File} from "../../core/models/file.model";
import {AngularFireAuth} from "@angular/fire/auth";
import {Observable} from "rxjs/internal/Observable";
import {switchMap} from "rxjs/operators";
import {AngularFireUploadTask} from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class DriveService {

  constructor(
    private afs: AngularFirestore,
    private fs: FirestoreService,
    private auth: AngularFireAuth,
) { }

  folderCol = this.afs.collection<Folder>("folders")
  filesCol = this.afs.collection<File>("files")

  createFolder(folderName: string, currentFolder: Folder)  {
    if(currentFolder == null) return

    let path = currentFolder.path
    if(currentFolder != ROOT_FOLDER) {
      path.push({name: currentFolder.name, id: currentFolder.id})
    }

    return this.auth.user.subscribe(user => {
      const folder: Folder = {
        id: "",
        name: folderName,
        userId: user.uid,
        createdAt: this.fs.getCurrentTimestamp(),
        parentId: currentFolder.id,
        path: path,
      }
      return this.fs.addWithId$(this.folderCol, folder)
    })
  }

  getCurrentFolder(folderId: string): Observable<Folder> {
    return this.fs.doc$(this.folderCol.doc(folderId))
  }

  getChildFolders(currentFolder: Folder): Observable<Folder[]> {
    return this.auth.user.pipe(
      switchMap(user => {
        return this.fs.col$<Folder>(this.folderCol.ref.path, ref => ref
          .where('parentId', '==', currentFolder.id)
          .where('userId', '==', user.uid)
          .orderBy('createdAt'))
      })
    )
  }

  getFiles(currentFolder: Folder): Observable<File[]> {
    return this.auth.user.pipe(
      switchMap(user => {
        return this.fs.col$<File>(this.filesCol.ref.path, ref => ref
          .where('folderId', '==', currentFolder.id)
          .where('userId', '==', user.uid)
          .orderBy('createdAt'))
      })
    );
  }

  uploadFile(userId: string, path: string, file): AngularFireUploadTask {
    return this.fs.storage.upload(`/files/${userId}/${path}`, file)
  }

  renameFolder(folderId: string, name: string) {
    return this.fs.database.folders.doc(folderId).update({name: name})
  }

  renameFile(fileId: string, name: string) {
    return this.fs.database.files.doc(fileId).update({name: name})
  }

}
