import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerwebPage } from './playerweb';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    PlayerwebPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerwebPage),
    PipesModule
  ],
})
export class PlayerwebPageModule {}
