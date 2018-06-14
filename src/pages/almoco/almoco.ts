import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { JantaPage } from '../janta/janta';
import { CafePage } from '../cafe/cafe';

@IonicPage()
@Component({
  selector: 'page-almoco',
  templateUrl: 'almoco.html',
})
export class AlmocoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlmocoPage');
  }

  doback() {
    this.navCtrl.push(CafePage);
  }


  doforward() {
    this.navCtrl.push(JantaPage);
  }

}
