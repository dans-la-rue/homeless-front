import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menuSubj = new BehaviorSubject<boolean>(false); 

  constructor() { }

  emitMenuStatus(status) {
    this.menuSubj.next(status)
  }

}
