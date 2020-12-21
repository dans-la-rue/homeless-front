import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {SheltersListComponent} from './shelters/shelters-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ShelterComponent} from './shelter/shelter.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      NgbModule,
      HttpClientModule,
      ReactiveFormsModule
    ],
    declarations: [
      SheltersListComponent,
      ShelterComponent
    ]
})
export class SheltersModule {
}
