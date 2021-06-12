import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {AuthComponent} from './auth.component';
import {AppMaterialModule} from "../shared/app-material.module";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppMaterialModule,
    MatDialogModule
  ],
  providers: []
})
export class AuthModule {
}
