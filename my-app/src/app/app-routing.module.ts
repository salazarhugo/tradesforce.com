import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConsoleComponent} from './console/console/console.component';
import {ProductComponent} from './product/product.component';
import {UserResolver} from './user.resolver';

const routes: Routes = [
  {
    path: 'product',
    component: ProductComponent,
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'console',
    component: ConsoleComponent, resolve: {data: UserResolver},
    loadChildren: () => import('./console/console.module').then(m => m.ConsoleModule)
  },
  {path: '**', redirectTo: 'product/investing'},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
