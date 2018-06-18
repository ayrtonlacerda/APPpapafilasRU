import { Component } from '@angular/core';
import { NavController, ToastController, MenuController, NavParams, AlertController, IonicPage } from "ionic-angular";
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
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
  public idUser;
  public myMatricula;
  public myCpf;
  public comparaCPF;
  public nomeUsuario;
  public saldoUsuario;
  public myEmail;
  public myGroup;
  public myStatus;

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Não encontrado!',
      subTitle: 'A matricula ou cpf estão incorretos, por favor tente novamente',
      buttons: ['OK']
    });
    alert.present();
  }


  login() {
    this.loginProvider.getMatricula(this.myMatricula).subscribe
      (

      data => {
        console.log('entra função login');
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);
        console.log(objeto_retorno);
        if (data.status == 200) {

		      this.idUser = objeto_retorno.ID_USUARIO;
          this.nomeUsuario = objeto_retorno.NOME_USUARIO;
          this.saldoUsuario = objeto_retorno.SALDO;
          this.myMatricula = objeto_retorno.MATRICULA;
          this.comparaCPF = objeto_retorno.CPF;
		      this.myEmail = objeto_retorno.EMAIL;
		      this.myGroup = objeto_retorno.ID_GRUPO;
		      this.myStatus = objeto_retorno.ID_STATUS;

		      localStorage.setItem("id", this.idUser);
          localStorage.setItem("nome", this.nomeUsuario);
		      localStorage.setItem("matricula", this.myMatricula);
          localStorage.setItem("saldo", this.saldoUsuario);
          localStorage.setItem("cpf", this.comparaCPF);
		      localStorage.setItem("email", this.myEmail);
		      localStorage.setItem("grupo", this.myGroup);
		      localStorage.setItem("status", this.myStatus);

          this.navCtrl.push( TabsPage);
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
