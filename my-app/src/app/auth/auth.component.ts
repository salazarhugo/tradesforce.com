import {Component, NgZone, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth'
import {Router} from '@angular/router';
import {AuthService} from 'src/app/core/authentication/auth.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AuthComponent>,
    private router: Router,
    public zone: NgZone,
    public auth: AngularFireAuth,
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  trySignInWithGoogle() {
    this.authService.signInWithGoogle().then(res => {
      this.router.navigate(['console/dashboard']);
      this.dialogRef.close();
    })
  }

  trySignInWithFacebook() {
    this.authService.signInWithFacebook().then(res => {
      this.router.navigate(['/console/dashboard']);
      this.dialogRef.close();
    })
  }

  trySignInWithGitHub() {
    this.authService.signInWithGitHub().then(res => {
      this.router.navigate(['/console/dashboard']);
      this.dialogRef.close();
    })
  }
}
