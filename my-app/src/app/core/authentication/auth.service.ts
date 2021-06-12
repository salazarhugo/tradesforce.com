import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {
  }

  signInWithFacebook() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
    })
  }

  signInWithEmailAndPassword(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  signInWithGoogle() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      // provider.addScope('https://www.googleapis.com/auth/profile.language.read')
      // provider.addScope('https://www.googleapis.com/auth/user.phonenumbers.read')
      this.afAuth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        })
    })
  }

  signInWithGitHub() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GithubAuthProvider();
      this.afAuth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        })
    })
  }

  logout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.signOut();
        resolve(null);
      } else {
        reject();
      }
    });
  }

}
