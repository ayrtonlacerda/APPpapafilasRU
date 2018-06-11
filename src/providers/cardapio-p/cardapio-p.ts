//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class CardapioPProvider {

  private baseApiPathCardapio = 'http://35.199.101.182/api/cardapio/';
  public DateParametro = localStorage.getItem("Date");
  constructor(public http: Http) {
    console.log('Hello CardapioPProvider Provider');
  }


  getCardapio(dia_atual){
    console.log('ENTREI DATA');
    console.log(dia_atual);
    return this.http.get(this.baseApiPathCardapio + dia_atual);
  }

}
//'20180604'
