import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import '../../assets/scriptpagseguro';
//import 'rxjs/add/operator/map';
/*
  Generated class for the PagamentoPProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PagamentoPProvider {

  private baseApiPathInicioSessao = 'http://35.199.101.182/api/creditos/iniciaSessao'

  constructor(public http: Http) {
    
  }

  getHash(){
    return this.http.post(this.baseApiPathInicioSessao,null);
  }

  getHash2(){
    return this.http.post(this.baseApiPathInicioSessao,null);
  }

  testandoessaporra()
  {
    //return this.http.post('assets/scriptpagseguro',PagSeguroDirectPayment.setItemId);
  }

}
