import {Component, OnInit, ViewChild} from '@angular/core';
import {SidenavService} from "../../services/sidenav.service";
import {MatDrawerMode, MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver, BreakpointState} from "@angular/cdk/layout";

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.sass']
})
export class ConsoleComponent implements OnInit {

  mode: MatDrawerMode
  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(
    public sidenavService: SidenavService,
    public breakpointObserver: BreakpointObserver
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
    this.breakpointObserver
      .observe(['(min-width: 960px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) { //Viewport is 960px or over!
          this.sidenav.open()
          this.mode = "side"
        } else {
          this.sidenav.close()
          this.mode = "over"
        }
      })
  }
}
