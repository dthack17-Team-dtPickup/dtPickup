import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddRideTemplatePage } from '../add-ride-template/add-ride-template';
import { AuthService } from '../../services/AuthService/auth.service';
import { RideService } from '../../services/RideService/ride.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  authService: AuthService;
  rideService: RideService;
  rides: any;

  constructor(public navCtrl: NavController, authService: AuthService, rideService: RideService) {
    this.authService = authService;
    this.rideService = rideService;
  }

  showAcceptedRides() {
    this.rides = this.rideService.getAcceptedRides(this.authService.currentUserId);
  }

  showCanceledRides() {
    this.rides = this.rideService.getCanceledRides(this.authService.currentUserId);
  }

  openAddProfile(){
    this.navCtrl.push(AddRideTemplatePage)
  }

}
