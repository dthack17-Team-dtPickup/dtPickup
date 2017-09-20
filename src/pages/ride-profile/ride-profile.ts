import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RideService } from '../../services/GeofireService/ride.service';
import { ProfileService } from '../../services/ProfileService/profile.service';
import { AuthService } from '../../services/AuthService/auth.service';

@Component({
  selector: 'page-ride-profile',
  templateUrl: 'ride-profile.html'
})

export class RideProfilePage {

  ride: any;
  startpoint: any;
  stops: any;
  endpoint: any;

  constructor(public navCtrl: NavController, params: NavParams, rideService: RideService, authService: AuthService, profileService: ProfileService) {
    let rideId = params.get("rideId");
    this.ride = rideService.getRideFromId(rideId);
    this.ride.driver = profileService.getProfileFromId(this.ride.driverId);
    this.startpoint = this.ride.start_location;
    this.stops = this.ride.locations;
    this.endpoint = this.ride.destination;
  }

}
