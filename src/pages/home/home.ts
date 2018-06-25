import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, App } from 'ionic-angular';
import { CompraPage } from '../compra/compra';
import { ExtratoPage } from '../extrato/extrato';
import { LoginPage } from '../login/login';
import { LoginProvider } from '../../providers/login/login';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:
  [
    LoginProvider
  ]
})
export class HomePage {

  public myName = localStorage.getItem("nome");
  public mySaldo2;
  public pegasaldo;
  public myMatricula= localStorage.getItem("matricula");
  public mySaldo;
  public myDataCompra;
  public myValorCompra;
  public myStatusCompra;
  public myTextStatusCompra;

  constructor(public navCtrl: NavController,
              public loginProvider: LoginProvider,
              public app: App,
              public loadingCtlr : LoadingController,
              public alertCtlr : AlertController
             ) {}

             allCurrencies = [{
              name: 'Açaí',
              color: '#26a69a',
			  image: 'https://www.dandico.com.br/imagens/imagem1.png'
            }, {
              name: 'Academia',
              color: '#26a69a',
			  image: 'https://www.dandico.com.br/imagens/imagem2.png'
            }, {
              name: 'Banco',
              color: '#26a69a',
			  image: 'https://www.dandico.com.br/imagens/imagem3.png'
            }];

             showAlert()
             {
               let alert = this.alertCtlr.create({
                 title: 'Informação',
                 subTitle: 'Sua compra de '+this.myDataCompra+' no valor de '+this.myValorCompra+' está definida com o status '+this.myTextStatusCompra,
               });
               alert.present();
             }

  // login and go to home page
  docompra() {
    this.navCtrl.push(CompraPage);
  }

  doextrato() {
    this.navCtrl.push(ExtratoPage);
  }

  dosair() {
    const root = this.app.getRootNav();
    root.popToRoot();
    localStorage.removeItem("matricula");

  }

  presentLoadingDefault() {
    let loading = this.loadingCtlr.create({
      content: 'Aguarde um momento...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  lastTransition()
  {
    //console.log("Mudança desejada pelo professor");
    this.loginProvider.getHistorico(this.myMatricula).subscribe
    (
      data =>
      {
        //console.log(data);
        const response = (data as any);
        const objeto_retorno11 = JSON.parse(response._body);
        console.log(objeto_retorno11);
        this.myDataCompra = objeto_retorno11.DATA_COMPRA;
        this.myValorCompra = objeto_retorno11.VALOR_COMPRA;
        this.myStatusCompra = objeto_retorno11.ID_STATUS_PAGAMENTO;
        console.log(this.myDataCompra);
        console.log(this.myValorCompra);
        if(this.myStatusCompra == 2)
        {
          this.myTextStatusCompra = "- Aprovada!";
        }
        if(this.myStatusCompra == 3)
        {
          this.myTextStatusCompra = "- Cancelado!";
        }
        if(this.myStatusCompra == 1)
        {
          this.myTextStatusCompra = "- Aguardando pagamento!";
        }
        console.log(this.myStatusCompra);
        this.showAlert();
      },
      error =>
      {
        console.log("Deu erro");
      }
    )
  }

  ionViewWillEnter()
  {
    //console.log("teste");
    //console.log(this.myMatricula);
    //setInterval(this.refreshPage(),3000);
    this.loginProvider.getMatricula(this.myMatricula).subscribe
    (
      data =>
      {
        //console.log(data);
        const response = (data as any);
        const objeto_retorno10 = JSON.parse(response._body);
        //console.log(objeto_retorno10);
        this.mySaldo2 = objeto_retorno10.SALDO;
        if(data.status == 200)
        {
          setInterval(this.refreshPage(),1500);
          stop();
        }
        console.log(this.mySaldo2);
        //this.pegasaldo = localStorage.setItem("saldin",this.mySaldo2);
        //this.mySaldo = objeto_retorno10.SALDO;
      },
      error =>
        {
          console.log(error);
      }
    )
   this.mySaldo = this.mySaldo2;
   console.log(this.mySaldo);
  }

  refreshPage()
  {
    this.presentLoadingDefault();
    this.ionViewWillEnter();
  }
}
