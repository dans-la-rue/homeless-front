import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Shelter} from '../models/Shelter.models';
import {ShelterList} from '../models/ShelterList.models';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BasicAuth} from '../models/BasicAuth.models';
import {select, Store} from '@ngrx/store';
import {BasicFormComponent} from '../auth/basic-form/basic-form.component';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class SheltersService {

  private credentials;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa(this.credentials)
    })
  };
  private uri = 'api/v1/shelters';
  private url = environment.baseUrl + '/' + this.uri;
  private shelterList$: Observable<Shelter[]>;
  private cred$: Observable<BasicAuth> = this.store.pipe(select('cred'));
  // should be in his own service
  private modalRef: NgbModalRef;

  constructor(private _httpClient: HttpClient, private store: Store<{ cred: BasicAuth }>, private modalService: NgbModal) {
    this.cred$.subscribe((newCreds: BasicAuth) => {
        this.credentials = newCreds.login + ':' + newCreds.password;
        // TODO: modify instead of recreate
        this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(this.credentials)
          })
        };
      this.closeModal(this.credentials);
      }
    );
  }

  /**
   * display modal if he's not already displayed
   */
  displayModal() {
    if (this.modalRef == undefined)
      this.modalRef = this.modalService.open(BasicFormComponent);
    this.modalRef.componentInstance.name = 'login';

    // TODO: a LOGIN service can be setup and we could call him from here
    this.modalRef.result.then(value => {
      console.log('closing the modal with these credentials: ', value)
    });
  }

  /**
   * this method can be called to close the login modal
   * this should probably be put in a separated service but for now it's there
   * @param credentials: just used as an example to return something to the caller of the Modal
   */
  closeModal(credentials: string) {
    if (this.modalRef != undefined)
      this.modalRef.close(credentials);
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
