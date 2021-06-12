import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {FirestoreService} from "../../../services/firestore.service";
import {Observable} from "rxjs/internal/Observable";
import {FirebaseUserModel} from "../../models/user.model";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  user: Observable<FirebaseUserModel>

  profileForm = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    phoneNumber: new FormControl(''),
    baseCurrency: new FormControl(''),
    role: new FormControl(''),
    country: new FormControl(''),
  });

  constructor(
    public firestoreService: FirestoreService,
    private titleService: Title
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle("Profile - Lars");
    this.user = this.firestoreService.docUser$()
    this.user.subscribe(user => {
      this.profileForm.patchValue(user);
    })
  }

}
