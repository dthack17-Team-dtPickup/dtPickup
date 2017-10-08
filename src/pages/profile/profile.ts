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

  public user_profile: any;
  templates: any;

  constructor(public navCtrl: NavController, auth: AuthService,public profileService: ProfileService, rideTemplateService: RideTemplateService) {
   this.loadPeople();
    this.templates = rideTemplateService.getRideTemplates(auth.currentUserId);
  //  console.log('user_profile: ' + this.user_profile.name);
  }

  loadPeople(){
    this.profileService.getProfile('1')
    .then(data => {
      this.user_profile = data;
    });
  }
}
