import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { StartPage } from '../pages/start/start';
import { LoginPage } from '../pages/login/login';
import {ConfigProvider} from '../providers/Config/Config';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html',
  providers: [
    ConfigProvider
  ]
})
export class MyApp {
  rootPage:any = StartPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              configProvider: ConfigProvider
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
                  }

                  console.log(config);

                  statusBar.styleDefault();
                  splashScreen.hide();
                });
              }
}
