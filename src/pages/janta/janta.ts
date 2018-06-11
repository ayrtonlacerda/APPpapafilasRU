import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CafePage } from '../cafe/cafe';
import { AlmocoPage } from '../almoco/almoco';


@IonicPage()
@Component({
  selector: 'page-janta',
  templateUrl: 'janta.html',
})
export class JantaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JantaPage');
  }

  doback() {
    this.navCtrl.push(AlmocoPage);
  }


  doforward() {
    this.navCtrl.push(CafePage);
  }


}
