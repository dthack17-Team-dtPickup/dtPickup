import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListPage } from "../list/list";
import { AddRideTemplatePage } from '../add-ride-template/add-ride-template';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  navActiveRideList(){
    this.navCtrl.push(ListPage)
  }

  openAddProfile(){
    this.navCtrl.push(AddRideTemplatePage)
  }

}
