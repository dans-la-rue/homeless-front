import {Component, Input, OnInit} from '@angular/core';
import {Shelter} from '../../models/Shelter.models';
import {ShelterList} from '../../models/ShelterList.models';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'shelter',
  templateUrl: './shelter.component.html',
  styleUrls: ['./shelter.component.scss']
})
export class ShelterComponent implements OnInit {

  @Input() shelter: Shelter;
  edit: boolean = false;

  sheltersList: Shelter[];
  profileForm = new FormGroup({
    address: new FormControl(''),
    availableBeds: new FormControl(''),
  });
  private uri = 'api/v1/shelters';
  private url = environment.baseUrl + '/' + this.uri;

  constructor(private _httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.profileForm.get('address').setValue(this.shelter.address);
    this.profileForm.get('availableBeds').setValue(this.shelter.availableBeds);
  }

  onSubmit() {
    this.edit = !this.edit;
    this.shelter.address = this.profileForm.value.address;
    this.shelter.availableBeds = this.profileForm.value.availableBeds;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:nimda')
      })
    };
    this._httpClient.put<ShelterList>(this.url + '/' + this.shelter.id, this.shelter, httpOptions)
      .subscribe((sheltersList: ShelterList) => {
          this.sheltersList = sheltersList.content;
        }
      );
  }
}
