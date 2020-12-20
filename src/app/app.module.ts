import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';

import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {FooterComponent} from './shared/footer/footer.component';

import {ComponentsModule} from './components/components.module';
import {SheltersModule} from './shelters/shelters.module';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {adminReducer, authReducer, shelterReducer, sheltersReducer} from './reducers/shelters.reducer';
import {BasicFormComponent} from './auth/basic-form/basic-form.component';
import {SheltersEffects} from './effects/shelters.effect';
import {ShelterEffects} from './effects/shelter.effect';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    BasicFormComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ComponentsModule,
    SheltersModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    EffectsModule.forRoot([ShelterEffects, SheltersEffects]),
    StoreModule.forRoot({shelter: shelterReducer, sheltersList: sheltersReducer, cred: authReducer, admin: adminReducer }),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
