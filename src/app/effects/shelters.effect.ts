import {EMPTY} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {SheltersService} from '../services/shelters.service';
import {
  addShelter,
  deleteShelter,
  getAllShelters,
  successAddShelter,
  successDeleteShelter,
  successGetAllShelters,
  successUpdateShelter,
  updateShelter
} from '../actions/shelters.action';

@Injectable()
export class SheltersEffects {

  deleteShelter$ = createEffect(() => this.actions$.pipe(
    ofType(deleteShelter),
    mergeMap((action) => this.sheltersService.deleteShelter(action.shelterId)
      .pipe(
        map(sheltersList => successDeleteShelter()),
        map(sheltersList => {
          console.log('Shelter service deleting a shelter', sheltersList);
          return sheltersList;
        }),
        catchError(() => EMPTY)
      ))
    )
  );

  updateShelter$ = createEffect(() => this.actions$.pipe(
    ofType(updateShelter),
    mergeMap((action) => this.sheltersService.updateShelter(action.shelter)
      .pipe(
        map(shelter => successUpdateShelter({shelter: shelter})),
        catchError(() => EMPTY)
      ))
    )
  );

  addShelter$ = createEffect(() => this.actions$.pipe(
    ofType(addShelter),
    mergeMap((action) => this.sheltersService.addShelter(action.shelter)
      .pipe(
        map(shelter => successAddShelter({shelter: shelter})),
        catchError(() => EMPTY)
      ))
    )
  );

  sheltersList$ = createEffect(() => this.actions$.pipe(
    ofType(getAllShelters),
    mergeMap(() => this.sheltersService.getAllShelters()
      .pipe(
        map(sheltersList => successGetAllShelters({sheltersList})),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(private actions$: Actions, private sheltersService: SheltersService) {
  }
}
