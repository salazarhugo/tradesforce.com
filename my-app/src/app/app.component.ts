import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {ThemeService} from './services/theme.service';
import {OverlayContainer} from "@angular/cdk/overlay";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  isDarkTheme: Observable<boolean>

  constructor(
    private themeService: ThemeService,
    private overlayContainer: OverlayContainer,
    private snack: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.darkTheme$
    this.isDarkTheme.subscribe(dark => {
      if (dark)
        this.overlayContainer.getContainerElement().classList.add('dark-theme');
      else
        this.overlayContainer.getContainerElement().classList.remove('dark-theme')
    })
    this.printWarningMessage()
    // this.showPolicyDialog()
  }

  showPolicyDialog() {
    const config: MatSnackBarConfig = {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      politeness: 'polite'
    }

    this.snack.open("Lars uses cookies to deliver its services," +
      " to personalize ads, and to analyze traffic." +
      " You can adjust your privacy controls anytime in your Lars settings.", 'OK', config)
  }

  printWarningMessage() {
    console.log('%c WARNING!', 'background: yellow; color: red; font-size: 70px')
    console.log('%c Using this console may allow attackers to impersonate you' +
      ' and steal your information using an attack called Self-XSS.Do not enter' +
      ' or paste code that you don\'t understand.', 'background: white; color: black; font-size: 40px')
  }

  title = 'lars-app';
}
