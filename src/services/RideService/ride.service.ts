import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Ride } from './Ride';
import 'rxjs/add/operator/take';
import { ProfileService } from '../../services/ProfileService/profile.service';

@Injectable()
export class RideTestService {

    dbRef: any;
    hits = new BehaviorSubject([]);
    profileService: ProfileService;

    constructor(private db: AngularFireDatabase, profileService: ProfileService) {
        /// Reference database location for GeoFire
        this.dbRef = this.db.list('/rides');
        this.profileService = profileService;
    }

    RIDES: Ride[] = [
        { id: '0001', driverId: '0001', driver: {}, pickupTime: '20.09.2017, 09:00 Uhr' },
        { id: '0002', driverId: '0003', driver: {}, pickupTime: '21.09.2017, 09:15 Uhr' },
        { id: '0003', driverId: '0004', driver: {}, pickupTime: '22.09.2017, 09:30 Uhr' }
    ];

    getAcceptedRides(profileId: string) {
        let res = this.RIDES;
        let me = this;
        res.forEach(function(ride) {
            var driver = me.profileService.getProfile(ride.driverId);
            ride.driver = driver;
        });
        return res;
    }

    getCanceledRides(profileId: string) {
        return [];
    }
        
}

