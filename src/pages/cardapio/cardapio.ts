import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
//import { ExtratoPProvider } from '../../providers/extrato-p/extrato-p';
//import { TabsPage } from '../tabs/tabs';
import { CardapioPProvider } from '../../providers/cardapio-p/cardapio-p';


@IonicPage()
@Component({
  selector: 'page-cardapio',
  templateUrl: 'cardapio.html',
  providers: [
    CardapioPProvider
  ]
})
export class CardapioPage {

  public lista_cardapio = new Array<any>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cardapioProvider: CardapioPProvider,
    public alertCtrl: AlertController
  ){}
      cardapio: string = "cafe";
      isAndroid: boolean = false;


    ionViewDidLoad() {
      console.log('ionViewDidLoad ExtratoPage');

      this.cardapioProvider.getCardapio().subscribe
        (
          data=>{
            //const response = (data as any);
           // const objeto_extrato = JSON.parse(response._body);
           // this.lista_extrato = objeto_extrato;
            //console.log(objeto_extrato);
            if (data.status == 200){
              console.log("tem extrato");
              const response = (data as any);
              const objeto_cardapio = JSON.parse(response._body);
              this.lista_cardapio = objeto_cardapio;
              console.log(objeto_cardapio);
            }
            else if(data.status == 206){
              console.log("Sem extrato");
              //this.showAlertExtrato();
              //this.navCtrl.push( TabsPage );
            }
          },
          error=>{
            console.log(error);
          }
        )
      }
    }
