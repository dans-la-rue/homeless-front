import {createAction, props} from '@ngrx/store';
import {Shelter} from '../models/Shelter.models';

export const deleteShelter = createAction('[test] Delete a shelter', props<{ shelterId: number }>());
export const getAllShelters = createAction('[Shelters Page] Load Shelters');
export const addShelter = createAction('[Shelters Page] Add Shelter', props<{ shelter: Shelter }>());
export const updateShelter = createAction('[Shelters Page] Update shelter', props<{ shelter: Shelter }>());
export const successAddShelter = createAction('[Shelters Page] Shelter added', props<{ shelter: Shelter }>());
export const successUpdateShelter = createAction('[Shelters Page] Shelter updated', props<{ shelter: Shelter }>());
export const successGetAllShelters = createAction('[Shelters Page] Shelters loaded', props<{ sheltersList: Shelter[] }>());
export const successDeleteShelter = createAction('[Shelters Page] Shelters deleted');
