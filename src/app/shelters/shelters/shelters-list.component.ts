import {Component, OnInit} from '@angular/core';
import {Shelter} from '../../models/Shelter.models';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {addShelter, getAllShelters} from '../../actions/shelters.action';

@Component({
  selector: 'shelter-list',
  templateUrl: './shelters-list.component.html',
  styleUrls: ['./shelters-list.component.scss']
})
export class SheltersListComponent implements OnInit {

  sheltersList$: Observable<Shelter[]> = this.store.pipe(select('sheltersList'));

  constructor(private store: Store<{ sheltersList: Shelter[] }>) {
  }

  /**
   * load the list of all the shelters asap
   * TODO: display a spinner
   */
  ngOnInit() {
    this.store.dispatch(getAllShelters());
  }

  /**
   * call the effect of adding a new shelter
   * TODO: display a special empty card that the user can use to fill the values of his new shelter
   */
  addShelter() {
    let shelter = {
      address: 'asfsadfsa',
      availableBeds: 6,
      id: 6
    } as Shelter;
    this.store.dispatch(addShelter({shelter}));
  }
}
