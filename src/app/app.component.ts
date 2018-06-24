import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { StartPage } from '../pages/start/start';
import { LoginPage } from '../pages/login/login';
import { ConfigProvider } from '../providers/Config/Config';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html',
  providers: [
    ConfigProvider
  ]
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform,
              platformLogin: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              configProvider: ConfigProvider
             ){
                platform.ready().then(() => {
                  
                  let config = configProvider.getConfigData();
                  console.log(config)
                  if(config == null){
                      this.rootPage = StartPage;
                      configProvider.setConfigData(false);
                  }
                  else{
                        this.rootPage = LoginPage;
                      }

                  console.log(config);

                  statusBar.styleDefault();
                  splashScreen.hide();
                });
              }
}
