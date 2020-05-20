import {Component, Input, OnInit} from '@angular/core';
import {Shelter} from '../../models/Shelter.models';
import {FormControl, FormGroup} from '@angular/forms';
import {deleteShelter, updateShelter} from '../../actions/shelters.action';
import {Store} from '@ngrx/store';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BasicFormComponent} from '../../auth/basic-form/basic-form.component';
import {Clone} from '../../utils/clone';
import {BasicAuth} from '../../models/BasicAuth.models';

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
  });

  constructor(private clone: Clone, private store: Store<{ cred: BasicAuth }>, private modalService: NgbModal) {
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

    //TODO: check if user is connected

    // display modal if he's not
    const modalRef = this.modalService.open(BasicFormComponent);
    modalRef.componentInstance.name = 'World';

    // try request if he is
    this.store.dispatch(updateShelter({shelter: this.shelter}));

    // TODO: display spinner
    // TODO: change the edit status after action is done (callback ?)
    this.edit = !this.edit;
    // modalRef.close();
  }

  /**
   * call the effect of deleteing a shelter
   */
  deleteShelter() {
    this.store.dispatch(deleteShelter({shelterId: this.shelter.id}));
  }
}
