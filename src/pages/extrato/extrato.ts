import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ExtratoPProvider } from '../../providers/extrato-p/extrato-p';
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-extrato',
  templateUrl: 'extrato.html',
  providers: [
    ExtratoPProvider
  ]
})
export class ExtratoPage {

  public matriculaExt = localStorage.getItem("matricula");
  public lista_extrato = new Array<any>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public extratoProvider: ExtratoPProvider,
    public alertCtrl: AlertController
  ) { }

  showAlertExtrato() {
    let alert = this.alertCtrl.create({
      title: 'Sem extrato no momento',
      //subTitle: 'A matricula ou cpf estão incorretos, por favor tente novamente',
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExtratoPage');
    console.log(this.matriculaExt);

    this.extratoProvider.getHistorico(this.matriculaExt).subscribe
      (
      data => {
        //const response = (data as any);
        // const objeto_extrato = JSON.parse(response._body);
        // this.lista_extrato = objeto_extrato;
        //console.log(objeto_extrato);
        if (data.status == 200) {
          console.log("tem extrato");
          const response = (data as any);
          const objeto_extrato = JSON.parse(response._body);
          this.lista_extrato = objeto_extrato;
          console.log(objeto_extrato);
        }
        else if (data.status == 206) {
          console.log("Sem extrato");
          this.showAlertExtrato();
          this.navCtrl.push(TabsPage);
        }


      },
      error => {
        console.log(error);
      }
      )
  }
}
