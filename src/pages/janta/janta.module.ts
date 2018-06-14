import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JantaPage } from './janta';

@NgModule({
  declarations: [
    JantaPage,
  ],
  imports: [
    IonicPageModule.forChild(JantaPage),
  ],
})
export class JantaPageModule {}
