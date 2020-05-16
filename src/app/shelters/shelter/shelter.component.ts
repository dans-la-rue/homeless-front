import {Component, Input, OnInit} from '@angular/core';
import {Shelter} from '../../models/Shelter.models';
import {FormControl, FormGroup} from '@angular/forms';
import {deleteShelter, updateShelter} from '../../actions/shelters.action';
import {Store} from '@ngrx/store';

@Component({
  selector: 'shelter',
  templateUrl: './shelter.component.html',
  styleUrls: ['./shelter.component.scss']
})
export class ShelterComponent implements OnInit {

  @Input() shelter: Shelter;
  edit: boolean = false;

  profileForm = new FormGroup({
    address: new FormControl(''),
    availableBeds: new FormControl(''),
    news: new FormControl('')
  });

  constructor(private store: Store<{ sheltersList: Shelter[] }>) {
  }

  ngOnInit(): void {
    this.profileForm.get('address').setValue(this.shelter.address);
    this.profileForm.get('availableBeds').setValue(this.shelter.availableBeds);
    this.profileForm.get('news').setValue(this.shelter.news);
  }

  /**
   * call the effect of updating a shelter
   */
  onSubmit() {
    this.shelter = this.simpleClone(this.shelter);
    this.shelter.address = this.profileForm.value.address;
    this.shelter.availableBeds = this.profileForm.value.availableBeds;
    this.shelter.news = this.profileForm.value.news;
    this.store.dispatch(updateShelter({shelter: this.shelter}));
    // todo: change the edit status only after action is done (callback ?)
    this.edit = !this.edit;
  }

  /**
   * shallow clone of an object
   * @param obj
   */
  simpleClone(obj: any) {
    return Object.assign({}, obj);
  }

  /**
   * call the effect of deleteing a shelter
   */
  deleteShelter() {
    this.store.dispatch(deleteShelter({shelterId: this.shelter.id}));
  }
}
