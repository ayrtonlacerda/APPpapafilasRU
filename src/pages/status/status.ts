import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { StatusPProvider } from '../../providers/status-p/status-p';
@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
  providers:[
    StatusPProvider
  ]
})
export class StatusPage {

  public lista_status = new Array<any>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public statusProvider: StatusPProvider,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');

    this.statusProvider.getStatus().subscribe
    (
      data => {

        if (data.status == 200) {
          console.log("tem status");
          const response = (data as any);
          const objeto_status = JSON.parse(response._body);
          this.lista_status = objeto_status;
          console.log(objeto_status);
        }
        else if (data.status == 206) {
          console.log("Sem status");
          this.showAlertExtrato();
          this.navCtrl.push(TabsPage);
        }


      },
      error => {
        console.log(error);
      }
    )
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
