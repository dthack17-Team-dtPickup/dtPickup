
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicErrorHandler, IonicPageModule } from 'ionic-angular';
import { SignupUserPage } from "./signup-user";


@NgModule({
  declarations: [
    SignupUserPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupUserPage)
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class SignupUserModule {}
