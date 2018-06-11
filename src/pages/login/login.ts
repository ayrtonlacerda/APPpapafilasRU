import { Component } from '@angular/core';
import { NavController, ToastController, MenuController, NavParams, AlertController, IonicPage } from "ionic-angular";
import { TabsPage } from '../tabs/tabs';
import { LoginProvider } from '../../providers/login/login';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [
    LoginProvider
  ]
})
export class LoginPage {

  constructor(
    public nav: NavController,
    public forgotCtrl: AlertController,
    public menu: MenuController,
    public toastCtrl: ToastController,
    private loginProvider: LoginProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {
    this.menu.swipeEnable(false);
  }

  public myMatricula;
  public myCpf;
  public comparaCPF;
  public nomeUsuario;
  public saldoUsuario;

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Não encontrado!',
      subTitle: 'A matricula ou cpf estão incorretos, por favor tente novamente',
      buttons: ['OK']
    });
    alert.present();
  }


  login() {
    console.log(this.myMatricula);
    console.log(this.myCpf);
    this.loginProvider.getMatricula(this.myMatricula).subscribe
      (

      data => {
        //console.log(data);
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        console.log(objeto_retorno);
        if (data.status == 200) {
          console.log("Entrou no if");

          this.nomeUsuario = objeto_retorno.NOME_USUARIO;
          this.saldoUsuario = objeto_retorno.SALDO;
          this.myMatricula = objeto_retorno.MATRICULA;
          this.comparaCPF = objeto_retorno.CPF;

          localStorage.setItem("nome", this.nomeUsuario);
          localStorage.setItem("saldo", this.saldoUsuario);
          localStorage.setItem("matricula", this.myMatricula);
          localStorage.setItem("cpf", this.comparaCPF);
          this.navCtrl.push(TabsPage);
          /*if(this.myCpf == this.comparaCPF)
            this.navCtrl.push( TabsPage );
          else
            this.showAlert();*/
        }
        else if (data.status == 206) {
          console.log("matricula invalida");
          this.showAlert();
        }
      },
      error => {
        console.log(error);
      }
      )

  }

}
