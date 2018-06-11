import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
  }

  public time1: number = 10;
  public lugar1: number = 5;
  public time2: number = 33;
  public lugar2: number = 2;
  public time3: number = 4;
  public lugar3: number = 54;
  public time4: number = 0;
  public lugar4: number = 0;
  public time5: number = 30;
  public lugar5: number = 40;
  public time6: number = 12;
  public lugar6: number = 110;






}
