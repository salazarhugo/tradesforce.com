import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {EMPTY, Observable, of} from 'rxjs';
import {Model} from '../../core/models/model.model';
import {ModelService} from '../services/model.service';
import {mergeMap, take} from "rxjs/operators";

@Injectable()
export class ModelResolver implements Resolve<Model> {

  constructor(
    private router: Router,
    private modelService: ModelService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Model> | Observable<never> {

    //If portfolio is passed by args
    if (this.router.getCurrentNavigation().extras.state != null) {
      const model = this.router.getCurrentNavigation().extras.state as Model
      this.modelService.setModel(model)
      return of(model)
    }

    return this.modelService.listenModel(route.params.id).pipe(
      take(1),
      mergeMap(model => {
        if (model) {
          // this.modelService.fetchStocks(model.id)
          this.modelService.setModel(model)
          return of(model)
        } else {
          this.router.navigate(['./dashboard']);
          return EMPTY
        }
      }))
  }
}
