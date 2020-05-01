import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Shelter} from '../../models/Shelter.models';
import {ShelterList} from '../../models/ShelterList.models';

@Component({
  selector: 'shelter-list',
  templateUrl: './shelters-list.component.html',
  styleUrls: ['./shelters-list.component.scss']
})
export class SheltersListComponent implements OnInit {

  private uri = 'api/v1/shelters';
  sheltersList: Shelter[];
  shelter = {
    address: 'asfsadfsa',
    availableBeds: 6,
    id: 6
  } as Shelter;
  private url = environment.baseUrl + '/' + this.uri;

  constructor(private _httpClient: HttpClient) {
  }

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:nimda')
      })
    };
    this._httpClient.get<ShelterList>(this.url, httpOptions)
      .subscribe((sheltersList: ShelterList) => {
          this.sheltersList = sheltersList.content;
          console.log(this.sheltersList);
        }
      );
  }

  addShelter() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:nimda')
      })
    };
    this._httpClient.post<Shelter>(this.url, this.shelter, httpOptions)
      .subscribe((shelterCreated: Shelter) => {
          console.log(shelterCreated);
          this.sheltersList.push(shelterCreated);
          this.shelter.id = shelterCreated.id;
        }
      );
  }

  deleteShelter() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:nimda')
      })
    };
    this._httpClient.delete<Shelter>(this.url + '/' + this.shelter.id, httpOptions)
      .subscribe((shelter: Shelter) => {
          console.log('deleted !');
          console.log(this.shelter);
        }
      );
  }
}
