import {createAction, props} from '@ngrx/store';
import {Shelter} from '../models/Shelter.models';
import {BasicAuth} from '../models/BasicAuth.models';

export class PostActions {
  static SUCCESS_UPDATE_SHELTER = '[Shelters Page] Shelter updated';
  static DELETE_SHELTER = '[test] Delete a shelter';
  static GET_ALL_SHELTERS = '[Shelters Page] Load Shelters';
  static ADD_SHELTER = '[Shelters Page] Add Shelter';
  static UPDATE_SHELTER = '[Shelters Page] Update shelter';
  static SUCCESS_ADD_SHELTER = '[Shelters Page] Shelter added';
  static SUCCESS_GET_ALL_SHELTER = '[Shelters Page] Shelters loaded';
  static SUCESS_DELETE_SHELTER = '[Shelters Page] Shelters deleted';
}

export const deleteShelter = createAction(PostActions.DELETE_SHELTER, props<{ shelterId: number }>());
export const getAllShelters = createAction(PostActions.GET_ALL_SHELTERS);
export const addShelter = createAction(PostActions.ADD_SHELTER, props<{ shelter: Shelter }>());
export const updateShelter = createAction(PostActions.UPDATE_SHELTER, props<{ shelter: Shelter }>());
export const successAddShelter = createAction(PostActions.SUCCESS_ADD_SHELTER, props<{ shelter: Shelter }>());
export const successUpdateShelter = createAction(PostActions.SUCCESS_UPDATE_SHELTER, props<{ shelter: Shelter }>());
export const successGetAllShelters = createAction(PostActions.SUCCESS_GET_ALL_SHELTER, props<{ sheltersList: Shelter[] }>());
export const successDeleteShelter = createAction(PostActions.SUCESS_DELETE_SHELTER);

export const connexionRequest = createAction('[Login Page] connexion request', props<{ cred: BasicAuth}>());
