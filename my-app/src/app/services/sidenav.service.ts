import {Injectable} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private sidenav: MatSidenav
  private _isModel: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  isModel = this._isModel.asObservable()

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav
  }

  public open(): void {
    this.sidenav.open()
  }

  public close() {
    return this.sidenav.close()
  }

  setModel(isModel: boolean): void {
    this._isModel.next(isModel)
  }

  public toggle(): void {
    this.sidenav.toggle()
  }
}
