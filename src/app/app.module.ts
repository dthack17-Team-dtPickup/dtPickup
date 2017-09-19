import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//database modules
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseModule } from "./app.firebase.config";

//main app Component
import { DtPickup } from './app.component';

// Application Pages
import { LoginUserPage } from "../setup-pages/login-user/login-user";
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

//Ionic Native Modules
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from "../setup-pages/services/auth.service";
import { SignupUserModule } from "../setup-pages/signup-user/signup-user.module";



@NgModule({
  declarations: [
    DtPickup,
    HomePage,
    ListPage,
    LoginUserPage,
  
  ],
  imports: [
    BrowserModule,
    FirebaseModule,
    SignupUserModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicModule.forRoot(DtPickup),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DtPickup,
    HomePage,
    ListPage,
    LoginUserPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
