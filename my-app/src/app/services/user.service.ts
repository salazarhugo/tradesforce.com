import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {BehaviorSubject} from "rxjs";
import User = firebase.User;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }

  user$ = new BehaviorSubject<User>({
    displayName: undefined,
    email: undefined,
    emailVerified: false,
    isAnonymous: false,
    metadata: undefined,
    multiFactor: undefined,
    phoneNumber: undefined,
    photoURL: undefined,
    providerData: [],
    providerId: "",
    refreshToken: "",
    tenantId: undefined,
    uid: "",
    delete(): Promise<void> {
      return Promise.resolve(undefined);
    },
    getIdToken(forceRefresh?: boolean): Promise<string> {
      return Promise.resolve("");
    },
    getIdTokenResult(forceRefresh?: boolean): Promise<firebase.auth.IdTokenResult> {
      return Promise.resolve(undefined);
    },
    linkAndRetrieveDataWithCredential(credential: firebase.auth.AuthCredential): Promise<firebase.auth.UserCredential> {
      return Promise.resolve(undefined);
    },
    linkWithCredential(credential: firebase.auth.AuthCredential): Promise<firebase.auth.UserCredential> {
      return Promise.resolve(undefined);
    },
    linkWithPhoneNumber(phoneNumber: string, applicationVerifier: firebase.auth.ApplicationVerifier): Promise<firebase.auth.ConfirmationResult> {
      return Promise.resolve(undefined);
    },
    linkWithPopup(provider: firebase.auth.AuthProvider): Promise<firebase.auth.UserCredential> {
      return Promise.resolve(undefined);
    },
    linkWithRedirect(provider: firebase.auth.AuthProvider): Promise<void> {
      return Promise.resolve(undefined);
    },
    reauthenticateAndRetrieveDataWithCredential(credential: firebase.auth.AuthCredential): Promise<firebase.auth.UserCredential> {
      return Promise.resolve(undefined);
    },
    reauthenticateWithCredential(credential: firebase.auth.AuthCredential): Promise<firebase.auth.UserCredential> {
      return Promise.resolve(undefined);
    },
    reauthenticateWithPhoneNumber(phoneNumber: string, applicationVerifier: firebase.auth.ApplicationVerifier): Promise<firebase.auth.ConfirmationResult> {
      return Promise.resolve(undefined);
    },
    reauthenticateWithPopup(provider: firebase.auth.AuthProvider): Promise<firebase.auth.UserCredential> {
      return Promise.resolve(undefined);
    },
    reauthenticateWithRedirect(provider: firebase.auth.AuthProvider): Promise<void> {
      return Promise.resolve(undefined);
    },
    reload(): Promise<void> {
      return Promise.resolve(undefined);
    },
    sendEmailVerification(actionCodeSettings?: firebase.auth.ActionCodeSettings | null): Promise<void> {
      return Promise.resolve(undefined);
    },
    toJSON(): Object {
      return undefined;
    },
    unlink(providerId: string): Promise<firebase.User> {
      return Promise.resolve(undefined);
    },
    updateEmail(newEmail: string): Promise<void> {
      return Promise.resolve(undefined);
    },
    updatePassword(newPassword: string): Promise<void> {
      return Promise.resolve(undefined);
    },
    updatePhoneNumber(phoneCredential: firebase.auth.AuthCredential): Promise<void> {
      return Promise.resolve(undefined);
    },
    updateProfile(profile: { displayName?: string | null; photoURL?: string | null }): Promise<void> {
      return Promise.resolve(undefined);
    },
    verifyBeforeUpdateEmail(newEmail: string, actionCodeSettings?: firebase.auth.ActionCodeSettings | null): Promise<void> {
      return Promise.resolve(undefined);
    }
  })

  init(user: User) {
    this.user$.next(user)
    firebase.auth().onAuthStateChanged(user => this.user$.next(user))
  }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          reject('User is not logged in');
        }
      })
    })
  }


  updateCurrentUser(value) {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser
      if (user == null) return
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }
}
