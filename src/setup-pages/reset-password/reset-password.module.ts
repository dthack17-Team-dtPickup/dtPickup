import { NgModule, ErrorHandler } from '@angular/core';
import { IonicErrorHandler, IonicPageModule } from 'ionic-angular';
import { ResetPasswordPage } from "./reset-password";


@NgModule({
  declarations: [
    ResetPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ResetPasswordPage)
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class ResetPasswordModule {}
