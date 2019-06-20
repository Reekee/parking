import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPassPage } from './edit-pass';

@NgModule({
  declarations: [
    EditPassPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPassPage),
  ],
})
export class EditPassPageModule {}
