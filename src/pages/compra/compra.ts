import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { PagamentoPProvider } from '../../providers/pagamento-p/pagamento-p';
import '../../assets/scriptpagseguro';
import { HomePage } from '../home/home';

declare var PagSeguroDirectPayment:any;

@IonicPage()
@Component({
  selector: 'page-compra',
  templateUrl: 'compra.html',
  providers:
  [
    PagamentoPProvider
  ]
})
export class CompraPage 
{
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pagamentoProvider: PagamentoPProvider,
    public alertCtrl: AlertController,
    public loadingCtrl : LoadingController
  ) {}

  public idUser = localStorage.getItem("id");
  public myMatricula = localStorage.getItem("matricula");
  public myUserName = localStorage.getItem("nome");
  public myCPF = localStorage.getItem("cpf");
  public myEmail = localStorage.getItem("email");
  public myGroup = localStorage.getItem("grupo");
  public myStatus = localStorage.getItem("status");
  public id;
  public myCardNumber;
  public myCvv;
  public myYear;
  public myMonth;
  public myCardBrand;
  public myCompra;
  public myNameCard;
  public myOwnerCpf;
  public myDdd;
  public myTelefone;
  public myEndereco;
  public myHomeNumber;
  public teste;
  public myCep;
  public myStreet;
  public myNeighborhood;
  public myCity;
  public myUF;
  public objetoIdHistorico =
  {
    "ID_USUARIO":this.idUser,
    "MATRICULA":this.myMatricula,
    "NOME_USUARIO":this.myUserName,
    "CPF":this.myCPF,
    "EMAIL":this.myEmail,
    "ID_GRUPO":this.myGroup,
    "ID_STATUS":this.myStatus,
    "SALDO":this.myCompra 
  }
  public idHistorico;
  public myNumero;
  public tokencard;
  public qualquercoisa = "";
  public hashUsuario;
  public enviaHashCartao;
  public saldoComparativo = localStorage.getItem("saldo");
  public saldoComparativoTeste = +this.saldoComparativo;
  public myCompraTeste;
  v: any;
  //public box_price = 0;
  //public box_price_formatted = "R$10.00";

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Aguarde um momento...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }

  checagem()
  {
  this.myCompraTeste = +this.myCompra;
  if(this.saldoComparativoTeste + this.myCompraTeste >= 100)
    {
      this.showAlert4();
    }
  }

  cpf_mask(v) 
  {
    v = v.replace(/(\d{2})(\d)/, '$1.$2'); //Insert a dot between the third and quarter digit again
    this.myCompra = v;
    console.log(this.myCompra); 
    this.myCompraTeste = +this.myCompra;
    console.log(this.myCompraTeste);
    if(this.saldoComparativoTeste + this.myCompraTeste >= 100)
    {
      this.showAlert4();
      this.navCtrl.push(HomePage);
    }
    return v;
  }

  showAlert() 
  {
    let alert = this.alertCtrl.create({
      title: 'Falha de conexão!',
      subTitle: 'Não foi possivel realizar a conexão com o servidor. Tente novamente mais tarde.',
      buttons: ['OK']
    });
    alert.present();
  }  

  showAlert1() 
  {
    let alert = this.alertCtrl.create({
      title: 'Obrigado por comprar conosco!',
      subTitle: 'Sua compra foi efetuada e seu saldo já foi atualizado',
      buttons: ['OK']
    });
    alert.present();
  }  

  showAlert2() 
  {
    let alert = this.alertCtrl.create({
      title: 'Obrigado por comprar conosco!',
      subTitle: 'Sua compra está sendo processada.',
      buttons: ['OK']
    });
    alert.present();
  }  

  showAlert3() 
  {
    let alert = this.alertCtrl.create({
      title: 'Erro no processamento.',
      subTitle: 'Ocorreu algum erro no processo da compra.',
      buttons: ['OK']
    });
    alert.present();
  }  

  showAlert4() 
  {
    let alert = this.alertCtrl.create({
      title: 'Erro no valor inserido.',
      subTitle: 'Valores inseridos ultrapassam o limite de R$100!',
      buttons: ['OK']
    });
    alert.present();
  } 

  showAlert5() 
  {
    let alert = this.alertCtrl.create({
      title: 'Aguarde',
      subTitle: 'Processando pagamento...',
    });
    alert.present();
  }

  geraHash()
  {
    this.hashUsuario = PagSeguroDirectPayment.getSenderHash();
    console.log(this.hashUsuario);
  }
    
  geraHashCartao()
    {
      PagSeguroDirectPayment.createCardToken({
        cardNumber: this.myCardNumber,
        brand: this.myCardBrand,
        cvv: this.myCvv,
        expirationMonth: this.myMonth,
        expirationYear: this.myYear,
        success: function(response)
        {
          this.tokencartao = response['card']['token'];
          //this.tokencard = response['card']['token'];
          console.log(this.tokencartao);
          localStorage.setItem("hashcartao",this.tokencartao);
        },
        error: function (response)
        {
          console.log(response);
        },
    }); 
  }    

  geraHashIdHistorico()
  {
    this.pagamentoProvider.getIdHistorico(this.teste,{
      "ID_USUARIO":this.idUser,
      "MATRICULA":this.myMatricula,
      "NOME_USUARIO":this.myUserName,
      "CPF":this.myCPF,
      "EMAIL":this.myEmail,
      "ID_GRUPO":this.myGroup,
      "ID_STATUS":this.myStatus,
      "SALDO":this.myCompra
    }).subscribe
    (
      data=>
      {
        const response2 = (data as any);
        const objeto_retorno_teste2 = JSON.parse(response2._body);
        this.idHistorico = objeto_retorno_teste2.ID_HISTORICO;
        console.log(data);
        console.log(this.idHistorico);
        this.myCompraTeste = +this.myCompra;
        if(this.saldoComparativoTeste + this.myCompraTeste >= 100)
        {
          this.showAlert4();
        }
      });
      error=>
      {
        this.showAlert();
      }
  }

  geraCepLocation()
  {
    this.geraHashIdHistorico();
    this.pagamentoProvider.getCepLocation({"cep":this.myCep}).subscribe
    (
      data=>
      {
        const response3 = (data as any);
        const objeto_retorno_teste3= JSON.parse(response3._body);
        this.myStreet = objeto_retorno_teste3.street;
        this.myNeighborhood = objeto_retorno_teste3.neighborhood;
        this.myCity = objeto_retorno_teste3.city;
        this.myUF = objeto_retorno_teste3.state;
        //console.log(data);
        console.log(this.myStreet);
        console.log(this.myNeighborhood);
        console.log(this.myCity);
        console.log(this.myUF);
      });
      error=>
      {
        console.log("erro na transação");
      }
  }
  geraAcabou()
  {
    this.presentLoadingDefault();
    //this.showAlert5();
    this.enviaHashCartao = localStorage.getItem("hashcartao");
    console.log(this.enviaHashCartao);
    this.pagamentoProvider.getEssaPorra(
      {
        "ID_USUARIO":this.idUser,
        "MATRICULA":this.myMatricula,
        "NOME_USUARIO":this.myUserName,
        "CPF":this.myCPF,
        "EMAIL":this.myEmail,
        "ID_GRUPO":this.myGroup,
        "ID_STATUS":this.myStatus,
        "SALDO":this.myCompra,
        "ID_HISTORICO":this.idHistorico,
        "HASH_CARTAO":this.enviaHashCartao,
        "HASH_USUARIO":this.hashUsuario,
        "NOME_TITULAR":this.myNameCard,
        "CPF_TITULAR":this.myOwnerCpf,
        "CODIGO_AREA":this.myDdd,
        "TELEFONE":this.myTelefone,
        "ENDERECO":this.myStreet,
        "NUMERO_CASA":this.myNumero,
        "BAIRRO":this.myNeighborhood,
        "CIDADE":this.myCity,
        "CEP":this.myCep,
        "UF":this.myUF
      }
    ).subscribe
    (
      data=>
      {
        console.log(data);
        const response = (data as any);
        const objeto_retorno5 = JSON.parse(response._body);
        if(objeto_retorno5.STATUS_COMPRA == 1)
        {
          this.showAlert2();
          this.navCtrl.push(HomePage);
        }
        if(objeto_retorno5.STATUS_COMPRA == 2)
        {
          this.showAlert1();
          this.navCtrl.push(HomePage);
        }
        if(objeto_retorno5.STATUS_COMPRA == 3)
        {
          this.showAlert3();
        }
      });
      error=>
      {
        console.log("deu meeeeerda");
      }
  }
  ionViewDidLoad() 
  {
    //console.log(this.saldoComparativo);
    this.pagamentoProvider.getHash2().subscribe
    (
     data=>
     {
      /*console.log(this.idUser);
      console.log(this.myMatricula);
      console.log(this.myUserName);
      console.log(this.myCPF);
      console.log(this.myEmail);
      console.log(this.myGroup);
      console.log(this.myStatus);
      console.log(data);*/
      //console.log(this.objetoIdHistorico);
      const response = (data as any);
      //const objeto_retorno = JSON.parse(response._body); 
      const objeto_retorno_teste = response._body;
      //this.saldoComparativo = objeto_retorno_teste.SALDO;
      console.log(objeto_retorno_teste);
      //if(this.saldoComparativoTeste + this.myCompra >= 100)
      //{
        //this.showAlert4();
      //}
      this.id = objeto_retorno_teste;
      PagSeguroDirectPayment.setSessionId(this.id);
    }); 
     error=>
     {
        this.showAlert();
     }    
  }
}
