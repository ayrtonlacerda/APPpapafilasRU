//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class LoginProvider {

  private baseApiPathUsuarios = 'http://35.199.101.182/api/usuarios/';
  private baseApiPath = 'https://dandico.com.br/api/historico/';

  constructor(public http: Http) {
    console.log('Hello LoginProvider Provider');
  }

  getMatricula(matricula){
    return this.http.get(this.baseApiPathUsuarios + matricula);
  }

  getHistorico(matricula){
    return this.http.get(this.baseApiPath+matricula+"/last");
  }

}
//170042500
//"https://www.globo.com/"
//http://35.199.101.182/api/usuarios/170042500
