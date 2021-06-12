import {Component, OnInit} from '@angular/core';
import {FirebaseApp} from '@angular/fire';
import {AngularFireAuth} from '@angular/fire/auth';
import {MatDialog} from '@angular/material/dialog';
import {AuthComponent} from 'src/app/auth/auth.component';

@Component({
  selector: 'app-product-masthead',
  templateUrl: './product-masthead.component.html',
  styleUrls: ['./product-masthead.component.sass']
})
export class ProductMastheadComponent implements OnInit {

  languages = [
    "English",
    "French"
  ]

  ngOnInit(): void {
  }

  constructor(
    public app: FirebaseApp,
    public auth: AngularFireAuth,
    public dialog: MatDialog
  ) {
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(AuthComponent, {
      panelClass: 'lars-login-dialog'
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    })
  }

}
