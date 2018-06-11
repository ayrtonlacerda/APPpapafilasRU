import { Injectable } from '@angular/core';

let config_key_name = "config"

@Injectable()
export class ConfigProvider {

  private config = {
    showSlide: false,
  }
 
 constructor() {

  }
  getConfigData(): any{
      return localStorage.getItem(config_key_name);
  }

  setConfigData(showSlide?: boolean){
    let config ={
      showSlide: false
    };

    if(showSlide){
      config.showSlide = showSlide;
    }

    localStorage.setItem(config_key_name, JSON.stringify(config));
  }


}
