import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfileService } from '../../services/ProfileService/profile.service';
import { AuthService } from '../../services/AuthService/auth.service';
import { RideTemplateService } from '../../services/RideTemplateService/ride.template.service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {

  user_profile: any;
  templates: any;

  constructor(public navCtrl: NavController, auth: AuthService, profileService: ProfileService, rideTemplateService: RideTemplateService) {
    this.user_profile = profileService.getProfile(auth.currentUserId);
    this.templates = rideTemplateService.getRideTemplates(auth.currentUserId);
  }

}
