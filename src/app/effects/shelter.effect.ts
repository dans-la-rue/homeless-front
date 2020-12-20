import {EMPTY} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {SheltersService} from '../services/shelters.service';
import {successUpdateShelter, updateShelter} from '../actions/shelters.action';

@Injectable()
export class ShelterEffects {

  updateShelter$ = createEffect(() => this.actions$.pipe(
    ofType(updateShelter),
    mergeMap((action) => this.sheltersService.updateShelter(action.shelter)
      .pipe(
        map(shelter => successUpdateShelter({shelter: shelter})),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(private actions$: Actions, private sheltersService: SheltersService) {
  }
}
