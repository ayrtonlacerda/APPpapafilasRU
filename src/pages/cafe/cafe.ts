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

  public BEBIDAS_Q_1 ="nada consta";
  public BEBIDAS_Q_VEG_1="nada consta";
  public ACHOCOLATADO_1="nada consta";
  public PAO_1="nada consta";
  public PAO_1="nada consta";
  public PROTEINA_1="nada consta";
  public PROTEINA_VEG_1="nada consta";
  public COMPLEMENTO_1="nada consta";
  public FRUTA_1="nada consta";
  public SALADA_2="nada consta";
  public MOLHO_2="nada consta";
  public PRATO_PRINCIPAL_2="nada consta";
  public GUARNICAO_2="nada consta";
  public PRATO_VEG_2="nada consta";
  public ACOMPANHAMENTOS_2="nada consta";
  public SOBREMESA_2="nada consta";
  public REFRESCO_2="nada consta";
  public SALADA_3="nada consta";
  public MOLHO_3="nada consta";
  public SOPA_3="nada consta";
  public PAO_3="nada consta";
  public PRATO_PRINCIPAL_3="nada consta";
  public PRATO_VEG_3="nada consta";
  public COMPLEMENTOS_3="nada consta";
  public SOBREMESA_3="nada consta";
  public REFRESCO_3="nada consta";



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

              this.BEBIDAS_Q_1 = this.lista_cardapio.BEBIDAS_Q_1;
              this.BEBIDAS_Q_VEG_1 = this.lista_cardapio.BEBIDAS_Q_VEG_1;
              this.ACHOCOLATADO_1 = this.lista_cardapio.ACHOCOLATADO_1;
              this.PAO_1 = this.lista_cardapio.PAO_1;
              this.PAO_1 = this.lista_cardapio.PAO_1;
              this.PROTEINA_1 = this.lista_cardapio.PROTEINA_1;
              this.PROTEINA_VEG_1 = this.lista_cardapio.PROTEINA_VEG_1;
              this.COMPLEMENTO_1 = this.lista_cardapio.COMPLEMENTO_1;
              this.FRUTA_1 = this.lista_cardapio.FRUTA_1;
              this.SALADA_2 = this.lista_cardapio.SALADA_2;
              this.MOLHO_2 = this.lista_cardapio.MOLHO_2;
              this.PRATO_PRINCIPAL_2 = this.lista_cardapio.PRATO_PRINCIPAL_2;
              this.GUARNICAO_2 = this.lista_cardapio.GUARNICAO_2;
              this.PRATO_VEG_2 = this.lista_cardapio.PRATO_VEG_2;
              this.ACOMPANHAMENTOS_2 = this.lista_cardapio.ACOMPANHAMENTOS_2;
              this.SOBREMESA_2 = this.lista_cardapio.SOBREMESA_2;
              this.REFRESCO_2 = this.lista_cardapio.REFRESCO_2;
              this.SALADA_3 = this.lista_cardapio.SALADA_3;
              this.MOLHO_3 = this.lista_cardapio.MOLHO_3;
              this.SOPA_3 = this.lista_cardapio.SOPA_3;
              this.PAO_3 = this.lista_cardapio.PAO_3;
              this.PRATO_PRINCIPAL_3 = this.lista_cardapio.PRATO_PRINCIPAL_3;
              this.PRATO_VEG_3 = this.lista_cardapio.PRATO_VEG_3;
              this.COMPLEMENTOS_3 = this.lista_cardapio.COMPLEMENTOS_3;
              this.SOBREMESA_3 = this.lista_cardapio.SOBREMESA_3;
              this.REFRESCO_3 = this.lista_cardapio.REFRESCO_3;

            }
            else if(data.status == 206){
              console.log("Sem cardapio");
              //this.showAlertExtrato();
              //this.navCtrl.push( TabsPage );
            this.BEBIDAS_Q_1 ="nada consta";
             this.BEBIDAS_Q_VEG_1="nada consta";
            this.ACHOCOLATADO_1="nada consta";
            this.PAO_1="nada consta";
              this.PAO_1="nada consta";
          this.PROTEINA_1="nada consta";
             this.PROTEINA_VEG_1="nada consta";
         this.COMPLEMENTO_1="nada consta";
         this.FRUTA_1="nada consta";
           this.SALADA_2="nada consta";
         this.MOLHO_2="nada consta";
               this.PRATO_PRINCIPAL_2="nada consta";
             this.GUARNICAO_2="nada consta";
             this.PRATO_VEG_2="nada consta";
               this.ACOMPANHAMENTOS_2="nada consta";
               this.SOBREMESA_2="nada consta";
               this.REFRESCO_2="nada consta";
               this.SALADA_3="nada consta";
               this.MOLHO_3="nada consta";
               this.SOPA_3="nada consta";
               this.PAO_3="nada consta";
               this.PRATO_PRINCIPAL_3="nada consta";
               this.PRATO_VEG_3="nada consta";
               this.COMPLEMENTOS_3="nada consta";
               this.SOBREMESA_3="nada consta";
               this.REFRESCO_3="nada consta";
            }
          },
          error=>{
            console.log(error);
          }
        )
      }

}
