import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.sass']
})
export class AddTagComponent implements OnInit {

  tag = {
    name: "",
    id: "",
    color: ""
  }
  constructor(public dialogRef: MatDialogRef<AddTagComponent>, public firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

  addTag() {
    if (firebase.auth().currentUser) {

      const docId = this.firestore.createId();
      this.tag.id = docId

      this.firestore.collection('users').doc(firebase.auth().currentUser.uid).collection('tags').doc(docId).set(this.tag).then(() => {
        console.log("Document successfully added new tag!");
        this.dialogRef.close();
      });
    }
  }
}
