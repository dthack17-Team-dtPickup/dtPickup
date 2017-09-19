import { Component, OnDestroy } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginUserPage } from "../setup-pages/login-user/login-user";

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
              splashScreen: SplashScreen, private auth: AngularFireAuth, public menu: MenuController) {
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.user = auth.authState
    this.user$ = this.user.subscribe(curAuth => curAuth ? this.rootPage = HomePage : this.rootPage = LoginUserPage);
    
  }

  logout(){
    this.menu.enable(false, 'menu_content')
    this.auth.auth.signOut();
  }

  ngOnDestroy(){
    this.user$.unsubscribe()
  }


}