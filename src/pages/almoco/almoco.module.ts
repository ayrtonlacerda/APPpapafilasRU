import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlmocoPage } from './almoco';

@NgModule({
  declarations: [
    AlmocoPage,
  ],
  imports: [
    IonicPageModule.forChild(AlmocoPage),
  ],
})
export class AlmocoPageModule { }
