import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ModelOverviewComponent} from "./components/model-overview/model-overview.component";
import {ModelRulesComponent} from "./components/model-rules/model-rules.component";
import {ModelTrackerComponent} from "./components/model-tracker/model-tracker.component";
import {ModelService} from "./services/model.service";
import {ModelResolver} from "./guards/model.resolver";
import {ModelRoutingModule} from "./model-routing.module";
import { ModelComponent } from './model/model.component';
import { FilterBuilderComponent } from './components/filter-builder/filter-builder.component';


@NgModule({
  declarations: [
    ModelOverviewComponent,
    ModelRulesComponent,
    ModelTrackerComponent,
    ModelComponent,
    FilterBuilderComponent
  ],
  imports: [
    ModelRoutingModule,
    CommonModule,
    SharedModule,
  ],
  providers: [
    ModelResolver,
  ]
})
export class ModelModule {
}
