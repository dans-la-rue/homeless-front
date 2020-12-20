import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Shelter} from '../../models/Shelter.models';
import {FormControl, FormGroup} from '@angular/forms';
import {deleteShelter, updateShelter} from '../../actions/shelters.action';
import {select, Store} from '@ngrx/store';
import {Clone} from '../../utils/clone';
import {BasicAuth} from '../../models/BasicAuth.models';
import {Actions} from '@ngrx/effects';
import {Observable, Subject} from 'rxjs';

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
  private admin$: Observable<boolean> = this.store.pipe(select('admin'));
  private admin: boolean = false;

  private shelter$: Observable<Shelter> = this.store.pipe(select('shelter'));

  constructor(private actionsSubj: Actions, private clone: Clone, private store: Store<{ shelter: Shelter, admin: boolean, cred: BasicAuth}>) {
    // if success we update the shelter and set the edit flag
    // if error, we can check here if needed
    // a problem with this is that every shelter is aware about every changes on every shelter, there has to be a better way
    this.shelter$
      .filter((value) => {
          if(value == undefined)
            return false;
          // here is a filter that we shouldn't have to do
          return value['id'] == this.shelter.id;
        }
      ).subscribe((newShelter: Shelter) => {
        this.shelter = newShelter;
        console.log("shelter updated: ", this.shelter);
        this.edit = !this.edit;
      }
    );
    this.admin$
      .subscribe((newAdmin: boolean) => {
          this.admin = newAdmin;
        }
      );
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
