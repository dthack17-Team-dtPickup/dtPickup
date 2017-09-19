import { NgModule, ErrorHandler } from '@angular/core';
import { IonicErrorHandler, IonicPageModule } from 'ionic-angular';
import { LoginUserPage } from "./login-user";

@NgModule({
  declarations: [
    LoginUserPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginUserPage)

  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class LoginUserModule {}
