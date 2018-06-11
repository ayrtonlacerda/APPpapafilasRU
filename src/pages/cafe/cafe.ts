import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CardapioPProvider } from '../../providers/cardapio-p/cardapio-p';

@IonicPage()
@Component({
  selector: 'page-cafe',
  templateUrl: 'cafe.html',
  providers: [
    CardapioPProvider
  ]
})
export class CafePage {

  public lista_cardapio = new Array<any>();
  public dia_semana;
  public dia_atual;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cardapioProvider: CardapioPProvider,

  ){}

      cardapio: string = "cafe";
      isAndroid: boolean = false;

   FuncaoData(){

        var DataAtual = new Date();
        var weekday = new Array(7);
            weekday[0] = "Domingo";
            weekday[1] = "Segunda-Feira";
            weekday[2] = "Terça-Feira";
            weekday[3] = "Quarta-Feira";
            weekday[4] = "Quinta-Feira";
            weekday[5] = "Sexta-Fera";
            weekday[6] = "Sábado";

        var DiaSemana = weekday[DataAtual.getDay()];
        var DiaAtual = DataAtual.getDate();
        var MesAtual = DataAtual.getMonth();
        var AnoAtual = DataAtual.getFullYear();
        var MesAtual = MesAtual + 1;
        var Today = AnoAtual + "-" + MesAtual + "-" + DiaAtual;

        /*console.log(Today);
        console.log(DiaSemana);
        console.log(DiaAtual);*/

        this.dia_atual = Today;
        this.dia_semana = DiaSemana;
        console.log(this.dia_atual);
        console.log(this.dia_semana);

        //localStorage.setItem("Date",this.dia_atual);
      }

    ionViewDidLoad(){
      this.FuncaoData();
      console.log('ionViewDidLoad ExtratoPage');
      //console.log(this.dia_atual);
      this.cardapioProvider.getCardapio(this.dia_atual).subscribe
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

        this.FuncaoData();
      }

}
