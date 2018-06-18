import { Injectable } from '@angular/core';

let config_Login_key_name = "configLogin"

@Injectable()
export class ConfigLoginProvider {

  private configLogin = {
    showLogin: false,
  }
 
 constructor() {

  }
  getConfigLoginData(): any{
      return localStorage.getItem(config_Login_key_name);
  }

  setConfigLoginData(showLogin?: boolean){
    let configLogin ={
      showLogin: false
    };

    if(showLogin){
      configLogin.showLogin = showLogin;
    }

    localStorage.setItem(config_Login_key_name, JSON.stringify(configLogin));
  }


}
