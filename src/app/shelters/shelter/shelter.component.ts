import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Shelter} from '../../models/Shelter.models';
import {FormControl, FormGroup} from '@angular/forms';
import {deleteShelter, PostActions, updateShelter} from '../../actions/shelters.action';
import {Store} from '@ngrx/store';
import {Clone} from '../../utils/clone';
import {BasicAuth} from '../../models/BasicAuth.models';
import {Actions, ofType} from '@ngrx/effects';
import {filter} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'shelter',
  templateUrl: './shelter.component.html',
  styleUrls: ['./shelter.component.scss']
})
export class ShelterComponent implements OnInit, OnDestroy {

  @Input() shelter: Shelter;
  edit: boolean = false;

  profileForm = new FormGroup({
    address: new FormControl(''),
    availableBeds: new FormControl(''),
  });

  destroyed$ = new Subject<boolean>();

  constructor(private actionsSubj: Actions, private clone: Clone, private store: Store<{ cred: BasicAuth }>) {
    // we subscribe to the success update event so that we toggle the edit flag
    //https://stackoverflow.com/questions/43226681/how-to-subscribe-to-action-success-callback-using-ngrx-and-effects
    actionsSubj
      .pipe(
        ofType(PostActions.SUCCESS_UPDATE_SHELTER),
        filter((value) => {
          return value['shelter']['id'] == this.shelter.id;
        })
      )
      .subscribe(data => {
        this.edit = !this.edit;
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  ngOnInit(): void {
    this.profileForm.get('address').setValue(this.shelter.address);
    this.profileForm.get('availableBeds').setValue(this.shelter.availableBeds);
  }

  /**
   * call the effect of updating a shelter
   */
  onSubmit() {
    this.shelter = this.clone.simpleClone(this.shelter);
    this.shelter.address = this.profileForm.value.address;
    this.shelter.availableBeds = this.profileForm.value.availableBeds;

    // TODO: display spinner
    this.store.dispatch(updateShelter({shelter: this.shelter}));
  }

  /**
   * call the effect of deleting a shelter
   */
  deleteShelter() {
    this.store.dispatch(deleteShelter({shelterId: this.shelter.id}));
  }
}
