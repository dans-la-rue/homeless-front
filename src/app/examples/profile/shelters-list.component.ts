import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ShelterList} from '../../models/ShelterList';
import {Shelter} from '../../models/Shelter';

@Component({
  selector: 'app-profile',
  templateUrl: './shelters-list.component.html',
  styleUrls: ['./shelters-list.component.scss']
})
export class SheltersListComponent implements OnInit {

  private uri = 'api/v1/shelters';
  sheltersList: Shelter[];
​
  private url = environment.baseUrl + '/' + this.uri;

  constructor(private _httpClient: HttpClient) {
  }

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('admin:nimda')
      })
    };
    this._httpClient.get<ShelterList>(this.url, httpOptions)
      .subscribe((sheltersList: ShelterList) => {
          this.sheltersList = sheltersList.content;
          console.log(this.sheltersList);
        }
      )
  }
}
