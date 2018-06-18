import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { StartPage } from '../pages/start/start';
import { LoginPage } from '../pages/login/login';
import { ConfigProvider } from '../providers/Config/Config';
import { HomePage } from '../pages/home/home';
import { ConfigLoginProvider } from '../providers/ConfigLogin/ConfigLogin';

@Component({
  templateUrl: 'app.html',
  providers: [
    ConfigProvider,
    ConfigLoginProvider
  ]
})
export class MyApp {
  rootPage:any = StartPage;

  constructor(platform: Platform,
              platformLogin: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              configProvider: ConfigProvider,
              ConfigLoginProvider: ConfigLoginProvider
             ){
                platform.ready().then(() => {
                  // Okay, so the platform is ready and our plugins are available.
                  // Here you can do any higher level native things you might need.

                  let config = configProvider.getConfigData();
                  if(config == null){
                      this.rootPage = StartPage;
                      configProvider.setConfigData(false);

                  } else{
                        this.rootPage = LoginPage;
                        let ConfigLogin = ConfigLoginProvider.getConfigLoginData();
                  if(ConfigLogin == null){
                      this.rootPage = LoginPage;
                      ConfigLoginProvider.setConfigLoginData(false);    
                  } 
                  else{
                       this.rootPage = TabsPage;
                  }                 
                      }
                     
                 /* let ConfigLogin = ConfigLoginProvider.getConfigLoginData();
                  if(ConfigLogin == null){
                      this.rootPage = LoginPage;
                      ConfigLoginProvider.setConfigLoginData(false);    
                  } 
                  else{
                       this.rootPage = TabsPage;
                  }*/
                  
                  
                  console.log(config); 
                  console.log(ConfigLogin);

                  statusBar.styleDefault();
                  splashScreen.hide();
                });
              }
}
