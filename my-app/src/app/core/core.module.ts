import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MastheadComponent} from "./components/masthead/masthead.component";
import {AuthService} from "./authentication/auth.service";
import {IexApiService} from "./http/iexcloud/iex-api.service";
import {AppMaterialModule} from "../shared/app-material.module";
import {ProfileComponent} from './components/profile/profile.component';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {FlexModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    MastheadComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FlexModule
  ],
  exports: [
    MastheadComponent
  ],
  providers: [
    IexApiService
  ]
})
export class CoreModule {
}
