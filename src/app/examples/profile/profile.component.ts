import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private uri = 'api/v1/shelters';
  private sheltersList;
​
  private url = environment.baseUrl + '/' + this.uri;

  constructor(private _httpClient: HttpClient) {
  }

  ngOnInit() {
    var headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');
    headers_object.append('Authorization', 'Basic ' + btoa('admin:nimda'));

    const httpOptions = {
      headers: headers_object
    };
    this._httpClient.get(this.url, httpOptions)
      .subscribe(sheltersList => {
        this.sheltersList = sheltersList;
        console.log(this.sheltersList);
      });
  }
}
