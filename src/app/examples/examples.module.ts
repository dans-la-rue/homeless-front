import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {SheltersListComponent} from './profile/shelters-list.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        HttpClientModule,
    ],
    declarations: [
        SheltersListComponent
    ]
})
export class ExamplesModule { }
