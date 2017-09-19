import { Component } from '@angular/core'
import { IonicPage, NavController } from "ionic-angular";
import { AuthService } from "../services/auth.service";


@IonicPage()
@Component({
    selector:'page-signup-user',
    templateUrl: 'signup-user.html'
})

export class SignupUserPage{
    registerCredentials = {
        email: '',
        username: '',
        password: '',
    }


    constructor(private navCtrl: NavController, private auth: AuthService){
        
    }
    
    login(){
        this.navCtrl.canGoBack() ? this.navCtrl.popTo('UserLoginPage') : this.navCtrl.push('UserLoginPage')
    }

    signUp(){
        this.auth.createUserWithMail(this.registerCredentials)
        
    }

}