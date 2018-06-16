import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import '../../assets/scriptpagseguro.js';

declare var PagSeguroDirectPayment:any;

@Injectable()
export class PagamentoPProvider {

  private baseApiPathInicioSessao = 'https://www.dandico.com.br/api/creditos/iniciaSessao'
  private baseApiPathIdHistorico = 'https://www.dandico.com.br/api/creditos/insereHistorico';
  private baseApiCepLocation = 'https://www.dandico.com.br/api/creditos/buscacepapp';
  private baseacabouessabucetadocaralho = 'https://www.dandico.com.br/api/creditos/pagamento'

  constructor(public http: Http) {
    //console.log('Hello PagamentoPProvider Provider');
  }

  getHash()
  {
    return this.http.post(this.baseApiPathInicioSessao,null);
  }

  getHash2()
  {
    return this.http.post(this.baseApiPathInicioSessao,null);
  }  

  getIdHistorico(teste,json)
  {
    return this.http.post(this.baseApiPathIdHistorico,JSON.stringify(json));
  }

  getCepLocation(cep)
  {
    return this.http.post(this.baseApiCepLocation,JSON.stringify(cep));
  }

  getEssaPorra(porra)
  {
    /*PagSeguroDirectPayment.onSenderHashReady(function(response){
      if(response.status == 'error') {
          console.log(response.message);
          return false;
      }
      //console.log(response);
      var hash = response.senderHash;
      porra['HASH_USUARIO'] = hash;
      console.log(porra);
    })
      /*console.log(porra);
      porra['hash'] = hash;
      return this.http.post(this.baseacabouessabucetadocaralho,JSON.stringify(porra));*/
      return this.http.post(this.baseacabouessabucetadocaralho,JSON.stringify(porra));
    }}

PagSeguroDirectPayment.onSenderHashReady(function(response){
      if(response.status == 'error') 
      {
          console.log(response.message);
          return false;
      }
      var hash = response.senderHash;//Hash estará disponível nesta variável.
      return hash;
  });
