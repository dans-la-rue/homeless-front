import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Shelter} from '../models/Shelter.models';
import {ShelterList} from '../models/ShelterList.models';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SheltersService {

  private credentials = 'admin:nimda';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.credentials)
    })
  };
  private uri = 'api/v1/shelters';
  private url = environment.baseUrl + '/' + this.uri;
  private shelterList$: Observable<Shelter[]>;

  constructor(private _httpClient: HttpClient) {
  }

  /**
   * add a shelter
   */
  addShelter(shelter: Shelter) {
    return this._httpClient.post<Shelter>(this.url, shelter, this.httpOptions);
  }

  /**
   * delete a shelter
   */
  deleteShelter(id: number) {
    return this._httpClient.delete<Shelter>(this.url + '/' + id, this.httpOptions);
  }

  /**
   * update a specific shelter
   */
  updateShelter(shelter: Shelter) {
    return this._httpClient.put<Shelter>(this.url + '/' + shelter.id, shelter, this.httpOptions);
  }

  /**
   * fetch all the shelters
   */
  getAllShelters(): Observable<Shelter[]> {
    this.shelterList$ = this._httpClient.get<ShelterList>(this.url, this.httpOptions)
      .pipe(
        map((sheltersList: ShelterList) => {
            return sheltersList.content;
          }
        )
      );
    return this.shelterList$;
  }
}
