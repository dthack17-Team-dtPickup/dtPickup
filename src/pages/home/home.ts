import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddRideTemplatePage } from '../add-ride-template/add-ride-template';
import { AuthService } from '../../services/AuthService/auth.service';
import { RideService } from '../../services/GeofireService/ride.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  acceptedRides: any;
  canceledRides: any;
  rides: string = 'accepted';

  constructor(public navCtrl: NavController, authService: AuthService, rideService: RideService) {
    this.acceptedRides = rideService.getAcceptedRides(authService.currentUserId);
    this.canceledRides = rideService.getCanceledRides(authService.currentUserId);
  }

  openAddProfile(){
    this.navCtrl.push(AddRideTemplatePage)
  }

}
