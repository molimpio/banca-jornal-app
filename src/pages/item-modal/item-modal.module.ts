import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemModalPage } from './item-modal';

@NgModule({
  declarations: [
    ItemModalPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemModalPage),
  ],
})
export class ItemModalPageModule {}
