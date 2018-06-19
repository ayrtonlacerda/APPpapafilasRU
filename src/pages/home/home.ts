import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CompraPage } from '../compra/compra';
import { ExtratoPage } from '../extrato/extrato';
import { LoginPage } from '../login/login';
import { LoginProvider } from '../../providers/login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:
  [
    LoginProvider
  ]
})
export class HomePage {

  public myName = localStorage.getItem("nome");
  //public mySaldo = localStorage.getItem("saldo");
  public mySaldo2;
  public pegasaldo;
  public myMatricula= localStorage.getItem("matricula");
  //public mySaldo = localStorage.getItem("saldin");
  public mySaldo;

  constructor(public navCtrl: NavController,
  public loginProvider: LoginProvider) {

  }
  // login and go to home page
  docompra() {
    this.navCtrl.push(CompraPage);
  }

  doextrato() {
    this.navCtrl.push(ExtratoPage);
  }

  dosair() {
    this.navCtrl.push(LoginPage);
  }
  
  ionViewWillEnter()
  {
    //console.log("teste");
    //console.log(this.myMatricula);
    this.loginProvider.getMatricula(this.myMatricula).subscribe
    (
      data => 
        {
          const response = (data as any);
          const objeto_retorno10 = JSON.parse(response._body);
          //console.log(objeto_retorno10);
          this.mySaldo2 = objeto_retorno10.SALDO;
          console.log(this.mySaldo2);
          //this.pegasaldo = localStorage.setItem("saldin",this.mySaldo2);
          //this.mySaldo = objeto_retorno10.SALDO;
        },
      error => 
        {
          console.log(error);
        }
    )
   this.mySaldo = this.mySaldo2;
   console.log(this.mySaldo);
  }

refreshPage() 
{
  this.ionViewWillEnter();
}
}
