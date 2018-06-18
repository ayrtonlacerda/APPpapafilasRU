import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { CompraPage } from '../compra/compra';
import { ExtratoPage } from '../extrato/extrato';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public myName = localStorage.getItem("nome");
  public mySaldo = localStorage.getItem("saldo");
  //public mySaldo = localStorage.getItem("saldo");

  constructor(public navCtrl: NavController,
              public app: App
             ) {}
  // login and go to home page
  docompra() {
    this.navCtrl.push(CompraPage);
  }

  doextrato() {
    this.navCtrl.push(ExtratoPage);
  }

  dosair() {
    const root = this.app.getRootNav();
    root.popToRoot();
  }

}
