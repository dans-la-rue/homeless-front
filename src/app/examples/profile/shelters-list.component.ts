import {Component, HostListener, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ShelterList} from '../../models/ShelterList';
import {Shelter} from '../../models/Shelter';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-profile',
  templateUrl: './shelters-list.component.html',
  styleUrls: ['./shelters-list.component.scss']
})
export class SheltersListComponent implements OnInit {

  private uri = 'api/v1/shelters';
  sheltersList: Shelter[];
  deferredPrompt;
​
  private url = environment.baseUrl + '/' + this.uri;
  showButton: boolean = true;

  constructor(private _httpClient: HttpClient, private swUpdate: SwUpdate) {
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
    // Manage frontend application versions
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available. Load New Version?')) {
          window.location.reload();
        }
      });
    }
  }

  /**
   * Event to purpose to the user to install application
   * @param e event received
   */
  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    console.log('onbeforeinstallprompt event : ' + JSON.stringify(e));
    this.deferredPrompt = e;
    this.showButton = true;
  }


  /**
   * Propose to the user to install the application
   */
  addToHomeScreen() {
    // hide our user interface that shows our A2HS button
    if (this.deferredPrompt) {
      this.showButton = false;
      // Show the prompt
      this.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          this.deferredPrompt = undefined;
        });
    } else {
      console.error('The home screen option is not possible');
    }
  }
}
