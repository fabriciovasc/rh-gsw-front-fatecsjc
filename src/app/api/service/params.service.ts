import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class ParamsService {

  private params = {};
  newParams$: Subject<any> = new Subject<any>();

  constructor() {

  }

  add(key, param) {
    this.params[key] = param;
    this.newParams$.next({key, value: param});
  }

  get(key) {
    return this.params[key];
  }

  clearAll() {
    this.params = {};
  }

  clear(key) {
    delete this.params[key];
  }

  getAndClear(key) {
    const tempParam = this.params[key];
    delete this.params[key];
    return tempParam;
  }

  getParams() {
    return this.params;
  }

}
