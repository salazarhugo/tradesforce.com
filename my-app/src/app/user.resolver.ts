import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {Role} from './core/models/role';
import {FirebaseUserModel} from './core/models/user.model';
import {FirestoreService} from './services/firestore.service';
import {UserService} from './services/user.service';
import {ThemeService} from "./services/theme.service";

@Injectable({
    providedIn: 'root'
  })
export class UserResolver implements Resolve<FirebaseUserModel> {

  constructor(
    public userService: UserService,
    public themeService: ThemeService,
    private firestoreService: FirestoreService,
    private router: Router
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<FirebaseUserModel> {

    let user = new FirebaseUserModel();

    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
        .then(res => {
          this.userService.init(res)
          this.themeService.init()
          if (res.providerData[0].providerId == 'password') {
            user.photoUrl = 'https://via.placeholder.com/400x300';
            user.provider = res.providerData[0].providerId;
          } else {
            user.photoUrl = res.photoURL;
          }
          user.name = res.displayName;
          user.email = res.email;
          user.emailVerified = res.emailVerified;
          user.phoneNumber = res.phoneNumber;
          user.role = Role.User
          user.provider = res.providerData[0].providerId;
          user.creationTime = new Date(res.metadata.creationTime);
          user.lastSignInTime = new Date(res.metadata.lastSignInTime);
          user.country = {currencyName: "USD", currencySymbol: "$", iso: "us", name: "United States"}

          this.firestoreService.getUserDocument().get().subscribe(docSnapchot => {
            if (docSnapchot.exists) {
              // this.modelService.init()
              resolve(user)
            } else {
              this.firestoreService.addUserDocument(user).then(res => {
                resolve(user);
              })
            }
          })
        }, err => {
          this.router.navigate(['/login']);
          return reject(err);
        })
    })
  }
}
