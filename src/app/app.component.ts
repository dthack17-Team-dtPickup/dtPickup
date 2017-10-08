import { Component, OnDestroy } from '@angular/core';
import { Platform, MenuController, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { HomePage } from '../pages/home/home';
import { LoginUserPage } from "../setup-pages/login-user/login-user";
import { ProfilePage } from '../pages/profile/profile';

import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from "rxjs/Observable";
import firebase from 'firebase'


@Component({
  templateUrl: 'app.html'
})

export class DtPickup implements OnDestroy{
  
  rootPage:any;
  private user: Observable<firebase.User>;
  private user$: any;

  constructor(platform: Platform, statusBar: StatusBar, 
              splashScreen: SplashScreen, private auth: AngularFireAuth, public menu: MenuController, public appCtrl: App, public push: Push, public alertCtrl: AlertController) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.pushsetup();
    });

    this.user = auth.authState
    this.user$ = this.user.subscribe(curAuth => curAuth ? this.rootPage = HomePage : this.rootPage = HomePage);
    
  }

  pushsetup() {
    const options: PushOptions = {
     android: {

     },
     ios: {
         alert: 'true',
         badge: true,
         sound: 'false'
     },
     windows: {},
     browser: {
      pushServiceURL: 'http://push.api.phonegap.com/v1/push'
    },
  };
 
  const pushObject: PushObject = this.push.init(options);
  
  pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
  
  pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));
  
  pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
 
  }





  logout(){
    this.menu.enable(false, 'menu_content')
    this.auth.auth.signOut();
  }
  
  ngOnDestroy(){
    this.user$.unsubscribe()
  }

  openProfilePage(){
//    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(ProfilePage);
  }

}