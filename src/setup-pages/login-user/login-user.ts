import { Component } from '@angular/core'
import { IonicPage, NavController, Loading, AlertController, LoadingController } from "ionic-angular";
import { AuthService } from "../services/auth.service";


@IonicPage()
@Component({
    selector:'page-login',
    templateUrl: 'login-user.html'
})

export class LoginUserPage{

/*    constructor(private authService: AuthService, private navCtrl: NavController){
        
    }*/


  loading: Loading;
  registerCredentials = { email: '', password: '' };
 
  constructor(private navCtrl: NavController, private authService: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }
 

login(){
    this.showLoading()
    this.authService.emailLogin(this.registerCredentials.email, this.registerCredentials.password)
}
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }


    signUp(){
        this.navCtrl.push('SignupUserPage')
    }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}