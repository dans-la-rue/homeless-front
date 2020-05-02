import {createReducer, on} from '@ngrx/store';
import {
  addShelter,
  deleteShelter,
  getAllShelters,
  successAddShelter,
  successDeleteShelter,
  successGetAllShelters, successUpdateShelter, updateShelter
} from '../actions/shelters.action';
import {Shelter} from '../models/Shelter.models';

export let sheltersList: Shelter[] = undefined;

const _counterReducer = createReducer(sheltersList,
  on(successDeleteShelter, (state) => {
    console.log('shelter deleted reducer');
    return sheltersList;
  }),
  on(successUpdateShelter, (state, action) => {
    console.log('shelter updated reducer', action.shelter);
    return sheltersList;
  }),
  on(successAddShelter, (state, action) => {
    console.log('shelter added reducer', action.shelter);
    sheltersList = [...sheltersList, action.shelter];
    return sheltersList;
  }),
  on(successGetAllShelters, (state, action) => {
    console.log('get all shelters loaded reducer', action.sheltersList);
    sheltersList = action.sheltersList;
    return sheltersList;
  }),
  on(getAllShelters, (state) => {
    console.log('get all shelters reducer', state);
    // console.log('list', action.sheltersList);
    // sheltersList = action.sheltersList;
    return sheltersList;
  }),
  on(updateShelter, (state, action) => {
    console.log('update reducer');
    return sheltersList;
  }),
  on(addShelter, (state, action) => {
    console.log('add reducer');
    return sheltersList;
  }),
  on(deleteShelter, (state, action) => {
    console.log('delete reducer', action.shelterId);
    sheltersList = sheltersList.filter(value => value.id != action.shelterId);
    return sheltersList;
  })
);

export function sheltersReducer(state, action) {
  return _counterReducer(state, action);
}
