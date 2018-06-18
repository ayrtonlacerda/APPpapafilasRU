import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PagamentoPProvider } from '../../providers/pagamento-p/pagamento-p';
import '../../assets/scriptpagseguro.js';

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
  //let self: any = this;

  showAlert() 
  {
    let alert = this.alertCtrl.create({
      title: 'Falha de conexão!',
      subTitle: 'Não foi possivel realizar a conexão com o servidor. Tente novamente mais tarde.',
      buttons: ['OK']
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
      });
      error=>
      {
        this.showAlert();
      }
  }

  geraCepLocation()
  {
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
        console.log("deu merda");
      }
  }
  geraAcabou()
  {
    this.enviaHashCartao = localStorage.getItem("hashcartao");
    console.log(this.enviaHashCartao);
    /*PagSeguroDirectPayment.onSenderHashReady(function(response){
      if(response.status == 'error') {
          console.log(response.message);
          return false;
      }
      console.log(response);
      var hash = response.senderHash;
    },*/
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
    //console.log(this.pagamentoProvider.getEssaPorra);
    (
      data=>
      {
        console.log(data);
      });
      error=>
      {
        console.log("deu meeeeerda");
      }
  }
  ionViewDidLoad() 
  {
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
      console.log(objeto_retorno_teste);
      this.id = objeto_retorno_teste;
      PagSeguroDirectPayment.setSessionId(this.id);
    }); 
     error=>
     {
        this.showAlert();
     }    
  }
}
