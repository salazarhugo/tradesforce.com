import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

const modules = [
  CommonModule,
  MatCardModule,
  MatMenuModule,
  MatChipsModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatSortModule,
  MatInputModule,
  MatProgressBarModule,
  MatDividerModule,
  MatDatepickerModule,
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatGridListModule,
  MatTabsModule,
  MatSlideToggleModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatBadgeModule,
  MatRippleModule,
  MatTreeModule,
  MatExpansionModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatSelectModule,
  MatTableModule,
  MatSliderModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class AppMaterialModule {
}
