import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { CafePage } from '../cafe/cafe';
import { StatusPage } from '../status/status';
//import { CardapioPage} from '../cardapio/cardapio';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CafePage;
  tab3Root = StatusPage;

  constructor() {

  }
}
