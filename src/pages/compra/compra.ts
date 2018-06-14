import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { PagamentoPProvider } from '../../providers/pagamento-p/pagamento-p';
import '../../assets/scriptpagseguro';

/**
 * Generated class for the CompraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compra',
  templateUrl: 'compra.html',
  providers:
  [
    PagamentoPProvider
  ]
})
export class CompraPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pagamentoProvider: PagamentoPProvider,
    public alertCtrl: AlertController,
    //public pagSeguro: AberturaPagSeguroProvider
    ){}

    public myNum;
    public myCpf;
    public myCep;
    public myValue;
    public myNumCar;
    public myBrand;
    public myMonVal;
    public myYeaVal;
    public myCod;
    public myEnd;

    public id;

    showAlert() {
      let alert = this.alertCtrl.create({
        title: 'Falha de conexão!',
        subTitle: 'Não foi possivel realizar a conexão com o servidor. Tente novamente mais tarde.',
        buttons: ['OK']
      });
      alert.present();
    }

    geraHash()
    {
      PagSeguroDirectPayment.onSenderHashReady(function(response){
        if(response.status == 'error') {
            console.log(response.message);
            return false;
        }
        var hash = response.senderHash;//Hash estará disponível nesta variável.
        console.log(hash);
      })}
      /*this.pagamentoProvider.getHash().subscribe
      (
       data=>
       {
        //console.log(objeto_retorno_teste);
        this.id = objeto_retorno_teste;
        PagSeguroDirectPayment.onSenderHashReady(function(response){
          if(response.status == 'error') {
              console.log(response.message);
              return false;
          }
          var hash = response.senderHash;//Hash estará disponível nesta variável.
          console.log(hash);
      });
      PagSeguroDirectPayment.getPaymentMethods({
        amount: 500.00,
        success: function(response) {
            console.log(response);
        },
        error: function(response) {
          console.log(response);
        },
        complete: function(response) {
          console.log(response);
        }
    });
       }, 
       error=>
       {
          this.showAlert();
       }
      )
    }
  */
   /* geraHash2()
    {
      this.pagamentoProvider.testandoessaporra().subscribe
      (
       data=>
       {
        console.log(data);
       }, 
       error=>
       {
          this.showAlert();
       }
      )
    }*/

    geraHashCartao()
    {
      PagSeguroDirectPayment.createCardToken({
        cardNumber: this.myNumCar,
        brand: this.myBrand,
        cvv: this.myCod,
        expirationMonth: this.myMonVal,
        expirationYear: this.myYeaVal,
        success: function(response)
        {
          var tokencartao = response['card']['token'];
          console.log(tokencartao);
        },
        error: function (response)
        {
          console.log(response);
        },
    });
    
    }

  ionViewDidLoad() 
  {
    this.pagamentoProvider.getHash2().subscribe
    (
     data=>
     {
      console.log(data);
      const response = (data as any);
      //const objeto_retorno = JSON.parse(response._body); 
      const objeto_retorno_teste = response._body;
      //console.log(objeto_retorno_teste);
      this.id = objeto_retorno_teste;
      PagSeguroDirectPayment.setSessionId(this.id);
    }); 
     error=>
     {
        this.showAlert();
     }
  }

}
