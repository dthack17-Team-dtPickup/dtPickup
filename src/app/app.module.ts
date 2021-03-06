import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//database modules
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseModule } from "./app.firebase.config";

//database services 
import { AuthService } from "../services/AuthService/auth.service";
import { GeoService } from "../services/GeofireService/geofire.service";

//main app Component
import { DtPickup } from './app.component';

// Application Pages
import { LoginUserPage } from "../setup-pages/login-user/login-user";
import { HomePage } from '../pages/home/home';

//Ionic Native Modules
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SignupUserModule } from "../setup-pages/signup-user/signup-user.module";
import { ProfilePage } from '../pages/profile/profile';
import { AddRideTemplatePage } from "../pages/add-ride-template/add-ride-template";
import { ProfileService } from '../services/ProfileService/profile.service';
import { FillPipe } from '../pipes/pipes';
import { SetLocationPage } from "../pages/set-location/set-location";
import { RideTemplateService } from '../services/RideTemplateService/ride.template.service';
import { RideService } from '../services/GeofireService/ride.service';
import { RideProfilePage } from '../pages/ride-profile/ride-profile';
import { Push } from '@ionic-native/push';

@NgModule({
  declarations: [
    DtPickup,
    HomePage,
    LoginUserPage,
    ProfilePage,
    SetLocationPage,
    AddRideTemplatePage,
    FillPipe,
    RideProfilePage
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
    SetLocationPage,
    ProfilePage,
    LoginUserPage,
    AddRideTemplatePage,
    RideProfilePage
  ], 
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    GeoService,
    ProfileService,
    RideTemplateService,
    RideService,
    Push,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
