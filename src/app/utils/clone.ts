import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Clone {

  constructor() {
  }

  /**
   * shallow clone of an object
   * @param obj
   */
  simpleClone(obj: any) {
    return Object.assign({}, obj);
  }
}
