import {Component, OnInit} from '@angular/core';
import {Shelter} from '../../models/Shelter.models';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {addShelter, getAllShelters} from '../../actions/shelters.action';
import {Actions} from '@ngrx/effects';

@Component({
  selector: 'shelter-list',
  templateUrl: './shelters-list.component.html',
  styleUrls: ['./shelters-list.component.scss']
})
export class SheltersListComponent implements OnInit {

  private sheltersList$: Observable<Shelter[]> = this.store.pipe(select('sheltersList'));
  private admin$: Observable<boolean> = this.store.pipe(select('admin'));
  private admin: boolean = false;

  constructor(private actionsSubj: Actions, private store: Store<{ admin: boolean, sheltersList: Shelter[] }>) {
    this.admin$.subscribe((newAdmin: boolean) => {
      this.admin = newAdmin;
      }
    );
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
      address: 'new address',
      availableBeds: 0,
    } as Shelter;
    this.store.dispatch(addShelter({shelter}));
  }
}
