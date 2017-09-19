import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddRideTemplatePage } from '../add-ride-template/add-ride-template';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openAddProfile(){
    this.navCtrl.push(AddRideTemplatePage)
  }

}
