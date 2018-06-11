//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ExtratoPProvider {
  //public matricula = localStorage.getItem('matriculaS');

  private baseApiPathHistorico = 'http://35.199.101.182/api/historico/';

  constructor(public http: Http) {
    console.log('Hello ExtratoPProvider Provider');
  }

  getHistorico(matricula){
    console.log('sua matricula e '+matricula)
    return this.http.get(this.baseApiPathHistorico + matricula);
  }
}
//this.baseApiPathHistorico + matricula
