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
  public currentDate;
  public counter_day = 0;
  public yester_day = 0;



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cardapioProvider: CardapioPProvider,

  ){}

      cardapio: string = "cafe";
      isAndroid: boolean = false;

   private nextDay(){
     this.counter_day = this.counter_day + 1;
      console.log(this.counter_day);
     this.ionViewDidLoad();
   }

   private yesterDay(){
     this.counter_day = this.counter_day - 1;
      console.log(this.counter_day);
      this.ionViewDidLoad();
   }


   FuncaoData(){

        var DataAtual = new Date();
        this.currentDate = DataAtual;
        //this.currentDate = this.currentDate + 1;
        console.log("teste data");
        console.log(this.currentDate);


        var weekday = new Array(7);
            weekday[0] = "Domingo";
            weekday[1] = "Segunda-Feira";
            weekday[2] = "Terça-Feira";
            weekday[3] = "Quarta-Feira";
            weekday[4] = "Quinta-Feira";
            weekday[5] = "Sexta-Feira";
            weekday[6] = "Sábado";


        if(this.counter_day + DataAtual.getDay() > 6){
          var counter = this.counter_day;
          counter = counter -7;
          var DiaSemana = weekday[DataAtual.getDay() + counter];
          console.log(DiaSemana);
        }
        else if(this.counter_day + DataAtual.getDay() < 0){
          var counter = this.counter_day;
          counter = counter + 7;
          var DiaSemana = weekday[DataAtual.getDay() + counter];
          console.log(DiaSemana);
        }
        else{
          var DiaSemana = weekday[DataAtual.getDay() + this.counter_day];
          console.log(DiaSemana);
        }
        var DiaAtual = DataAtual.getDate() + this.counter_day;
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

      console.log('ionViewDidLoad CAFEPage');
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
              console.log("Sem cardapio");
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
