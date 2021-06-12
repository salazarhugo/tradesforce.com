import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import firebase from 'firebase';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-portfolios',
  templateUrl: './manage-portfolios.component.html',
  styleUrls: ['./manage-portfolios.component.sass']
})
export class ManagePortfoliosComponent implements OnInit {

  portfolio = {
    name: "",
    pid: "",
    uid: ""
  }
  portfolios = [];

  constructor(public dialogRef: MatDialogRef<ManagePortfoliosComponent>, public auth: AngularFireAuth, public firestore: AngularFirestore) {

  }

  ngOnInit(): void {
    this.loadPortfolios()
  }

  removePortfolio(portfolio) {
    const index = this.portfolios.indexOf(portfolio, 0);
    this.portfolios.splice(index, 1)
  }

  loadPortfolios() {
    if (firebase.auth().currentUser) {
      // User is signed in.
      this.firestore.collection('users').doc(firebase.auth().currentUser.uid).collection('portfolios').get().subscribe((data) => {
        data.docs.forEach((doc) => {
          this.portfolios.push(doc.data());
        })
      });
    }
  }

  editPortfolio(portfolio) {
    if (firebase.auth().currentUser) {
      // User is signed in.
      this.firestore.collection('users').doc(firebase.auth().currentUser.uid).collection('portfolios').doc(portfolio.pid).set(portfolio).then(() => {
        console.log("Document successfully updated!");
      });
    }
  }

  deletePortfolio(portfolio) {
    this.removePortfolio(portfolio)
    if (firebase.auth().currentUser) {
      // User is signed in.
      this.firestore.collection('users').doc(firebase.auth().currentUser.uid).collection('portfolios').doc(portfolio.pid).delete().then(() => {
        console.log("Document successfully deleted!");
      });
    }
  }
}
