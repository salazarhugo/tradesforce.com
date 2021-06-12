import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import {MatDialog} from '@angular/material/dialog';
import {AuthComponent} from 'src/app/auth/auth.component';
import {IndexService} from 'src/app/services/index.service';
import {Image} from "../../shared/components/carousel/carousel.component";

@Component({
  selector: 'app-investing',
  templateUrl: './investing.component.html',
  styleUrls: ['./investing.component.sass']
})
export class InvestingComponent implements OnInit {
  data: Array<any>
  images: Image[] = [ {
      url: "assets/img/piecharts.png",
      caption: "Spark smarter decisions with business intelligence"
    },
    {
      url: "assets/img/piecharts.png",
      caption: "Customize your data experiences with embedded analytics"
    },
    {
      url: "assets/img/piecharts.png",
      caption: "Customize your data experiences with embedded analytics"
    },
    {
      url: "assets/img/piecharts.png",
      caption: "Customize your data experiences with embedded analytics"
    }
  ]

  constructor(
    public auth: AngularFireAuth,
    public dialog: MatDialog,
    public indexService: IndexService
  ) {
  }

  ngOnInit(): void { }

  openLoginDialog() {
    const dialogRef = this.dialog.open(AuthComponent, {
      panelClass: 'lars-login-dialog'
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    })
  }
}
