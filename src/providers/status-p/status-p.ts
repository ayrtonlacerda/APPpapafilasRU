import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class StatusPProvider {

  private baseApiPathStatus = 'http://35.199.101.182/api/filas/status';

  constructor(public http: Http) {
    console.log('Hello StatusPProvider Provider');
  }

  getStatus(){
    return this.http.get(this.baseApiPathStatus);
  }
}
