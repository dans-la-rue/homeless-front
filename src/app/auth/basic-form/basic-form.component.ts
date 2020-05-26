import {Component, OnInit} from '@angular/core';
import {BasicAuth} from '../../models/BasicAuth.models';
import {FormControl, FormGroup} from '@angular/forms';
import {connexionRequest} from '../../actions/shelters.action';
import {select, Store} from '@ngrx/store';
import {Clone} from '../../utils/clone';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css']
})
export class BasicFormComponent implements OnInit {

  profileForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });
  private cred$: Observable<BasicAuth> = this.store.pipe(select('cred'));
  private cred: BasicAuth;

  constructor(private clone: Clone, private store: Store<{ cred: BasicAuth }>) {
    this.cred$.subscribe((newCreds: BasicAuth) => {
        this.cred = newCreds;
      }
    );
  }

  ngOnInit(): void {
    this.profileForm.get('login').setValue(this.cred.login);
    this.profileForm.get('password').setValue(this.cred.password);
  }

  /**
   * function called when you submit the login form
   * this saves the login and password in the store
   */
  onSubmit() {
    this.cred = this.clone.simpleClone(this.cred);
    this.cred.login = this.profileForm.value.login;
    this.cred.password = this.profileForm.value.password;

    console.log('new connexion request with cred: ', this.cred);
    this.store.dispatch(connexionRequest({cred: this.cred}));
  }
}
