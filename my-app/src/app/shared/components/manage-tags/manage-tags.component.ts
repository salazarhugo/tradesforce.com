import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import firebase from 'firebase';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddTagComponent } from '../add-tag/add-tag.component';

@Component({
  selector: 'app-manage-tags',
  templateUrl: './manage-tags.component.html',
  styleUrls: ['./manage-tags.component.sass']
})
export class ManageTagsComponent implements OnInit {

  tag = {
    name: "",
    id: "",
    color: ""
  }
  tags = [];

  constructor(public dialogRef: MatDialogRef<ManageTagsComponent>, public auth: AngularFireAuth, public firestore: AngularFirestore, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.loadTags()
  }

  openAddTagDialog() {
    this.dialog.open(AddTagComponent, {
      panelClass: 'myapp-border-radius-12-dialog'
    })
  }

  removeTag(tag) {
    const index = this.tags.indexOf(tag, 0);
    this.tags.splice(index, 1)
  }

  loadTags() {
    if (firebase.auth().currentUser) {
      // User is signed in.
      this.firestore.collection('users').doc(firebase.auth().currentUser.uid).collection('tags').get().subscribe((data) => {
        data.docs.forEach((doc) => {
          this.tags.push(doc.data());
        })
      });
    }
  }

  editTag(tag) {
    if (firebase.auth().currentUser) {
      // User is signed in.
      this.firestore.collection('users').doc(firebase.auth().currentUser.uid).collection('tags').doc(tag.id).set(tag).then(() => {
        console.log("Document successfully updated!");
      });
    }
  }

  addTag() {
    if (firebase.auth().currentUser) {

      const docId = this.firestore.createId();
      this.tag.id = docId

      this.firestore.collection('users').doc(firebase.auth().currentUser.uid).collection('tags').doc(docId).set(this.tag).then(() => {
        console.log("Document successfully added new tag!");
        this.tags.push(this.tag);
      });
    }
  }

  deleteTag(tag) {
    this.removeTag(tag)
    if (firebase.auth().currentUser) {
      // User is signed in.
      this.firestore.collection('users').doc(firebase.auth().currentUser.uid).collection('tags').doc(tag.id).delete().then(() => {
        console.log("Document successfully deleted!");
      })

    }
  }
}
