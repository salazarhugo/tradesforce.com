import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ModelRulesComponent} from "./components/model-rules/model-rules.component";
import {ModelOverviewComponent} from "./components/model-overview/model-overview.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'overview'},
  {path: 'overview', component: ModelOverviewComponent},
  {path: 'rules', component: ModelRulesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelRoutingModule {
}
