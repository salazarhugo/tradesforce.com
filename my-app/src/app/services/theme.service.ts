import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FirestoreService} from "./firestore.service";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  darkTheme$ = new BehaviorSubject(false)

  constructor(
    private firestoreService: FirestoreService,
  ) {
  }

  init(): void {
    this.firestoreService.docUser$().subscribe(userDoc => {
      this.darkTheme$.next(userDoc.darkMode)
    })
  }

  updateTheme(darkMode: boolean) {
    this.firestoreService.updateUser({darkMode: darkMode}).then(res => {
    })
  }
}
