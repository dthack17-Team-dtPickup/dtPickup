import { Component } from '@angular/core';
import { ModalController } from "ionic-angular";
import { SetLocationPage } from "../set-location/set-location";
import { RideService } from "../../services/GeofireService/ride.service";

@Component({
  selector: 'add-ride-template',
  templateUrl: 'add-ride-template.html'
})

export class AddRideTemplatePage {
  setting_start_location : boolean;
  start_loaction: any = '';
  destination_location: any = '';
  type: string = 'driver';
  date: any =  new Date().toISOString()
  time: string = '08:00'
  constructor(private modalCtrl: ModalController,private rideService: RideService) {

  }

  openAddressModal(from: string){
    (from == 'destination') ? 
      this.setting_start_location = false
     : this.setting_start_location = true

    let modal = this.modalCtrl.create(SetLocationPage, { limitToCities: true })
  
    modal.onDidDismiss(city => {
      if (this.setting_start_location && city){
        this.start_loaction = city
      }
      
      if(!this.setting_start_location && city){
        this.destination_location = city
      }
    })

    modal.present()
    
  }

  saveRide(){
    const ride_data =  {
      start_location: this.start_loaction,
      destination_location: this.destination_location,
      time: this.time,
      date: this.date
    }

    this.rideService.addRide(ride_data)
  }


}
